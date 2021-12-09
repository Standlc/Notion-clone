import styled from "styled-components";
import { NoteElement, NotesFile, SelectionProps } from "../../App";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ListComponent from "./listITem/ListComponent";
import {
  ArrowRight,
  DragIndicator,
  InsertPhoto,
  Remove,
} from "@material-ui/icons";
import PlaceHolder from "./PlaceHolder";
import { handleLineNavigation } from "./LineNavigation";
import { handleDeleteLine } from "./DeleteLine";
import { handleNewLine } from "./EnterNewLine";
import { useContext } from "react";
import { SelectionRangeContext } from "../../selectionRange";
import { hanldeMenuNavigation } from "./menuNavigation";
import { handleInput } from "./handleInput";
import {
  Divider,
  DividerInput,
  DividerWrapper,
  Function,
  Image,
  ImageInput,
  InputLine,
  ListContainer,
  Triangle,
  Wrapper,
} from "./elementsStyled";

interface Props {
  note: NoteElement;
  currentNotes: NotesFile;
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusedNote: React.Dispatch<React.SetStateAction<NoteElement | undefined>>;
  setSelectionBoundings: React.Dispatch<
    React.SetStateAction<SelectionProps["selectionBoundings"]>
  >;
  menuOptionIndex: number;
  setMenuOptionIndex: React.Dispatch<React.SetStateAction<number>>;
  enter: boolean;
  setEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Element: React.FC<Props> = ({
  note,
  currentNotes,
  setCurrentNotes,
  showMenu,
  setShowMenu,
  setFocusedNote,
  setSelectionBoundings,
  menuOptionIndex,
  setMenuOptionIndex,
  setEnter,
}) => {
  const [prevNote, setPrevNote] = useState<HTMLElement | null>(null);
  const lineRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [showList, setShowList] = useState(true);
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext
  );
  const [elementIsSelected, setElementIsSelected] = useState<boolean>(false);

  useEffect(() => {
    const lineIndex = currentNotes.notes.indexOf(note);
    setPrevNote(document.getElementById(currentNotes.notes[lineIndex - 1]?.id));
  }, [currentNotes, note]);

  useLayoutEffect(() => {
    const range = new Range();
    if (selectionRange.elementId !== note.id) {
      setElementIsSelected(false);
      return;
    }
    const childNode = lineRef.current?.childNodes[0];
    if (childNode === undefined) return;
    setElementIsSelected(true);
    range.setStart(childNode, selectionRange.start);
    range.setEnd(childNode, selectionRange.end);
    getSelection()?.removeAllRanges();
    getSelection()?.addRange(range);
  }, [selectionRange]);

  //DELETE NOTE
  const handleRemoveNote = () => {
    const noteId = note.id;
    if (currentNotes.notes.length === 1) {
      note.content = "";
      if (lineRef.current?.innerHTML)
        lineRef.current.childNodes[0].textContent = "";
      return;
    }
    currentNotes.notes = currentNotes.notes.filter(
      (note) => note.id !== noteId
    );
    const currentNotesCopy = { ...currentNotes };
    setCurrentNotes(currentNotesCopy);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    //ENTER NEW NOTE
    if (e.key === "Enter" && !showMenu) {
      handleNewLine(
        e,
        currentNotes,
        setCurrentNotes,
        note,
        lineRef,
        setSelectionRange
      );
    }
    //MENU NAVIAGTION
    if (showMenu) {
      hanldeMenuNavigation(
        e,
        menuOptionIndex,
        setMenuOptionIndex,
        note,
        setEnter
      );
    }
    //DELETE NOTE
    if (e.key === "Backspace") {
      const caretPos = getSelection()?.getRangeAt(0).endOffset;
      const lineLength = lineRef.current?.childNodes[0].textContent?.length;
      if (
        lineLength === 1 &&
        caretPos === lineLength &&
        lineRef.current?.childNodes[0]
      ) {
        e.preventDefault();
        note.content = "";
        if (lineRef.current) lineRef.current.childNodes[0].textContent = "";
        const currentNotesCopy = { ...currentNotes };
        setCurrentNotes(currentNotesCopy);
        setShowMenu(false);
      } else
        handleDeleteLine(
          e,
          prevNote,
          lineRef,
          currentNotes,
          setCurrentNotes,
          note,
          setSelectionRange
        );
    }
    //GO UP
    if (e.key === "ArrowUp" && !showMenu) {
      handleLineNavigation(e, "up", setSelectionRange, note, currentNotes);
    }
    //GO DOWN
    if (e.key === "ArrowDown" && !showMenu) {
      handleLineNavigation(e, "down", setSelectionRange, note, currentNotes);
    }
  };
  //IMAGE
  const [file, setFile] = useState(null);
  const handleImage = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleTextInput = (e: React.FormEvent<HTMLDivElement>) => {
    handleInput(
      e,
      lineRef,
      note,
      currentNotes,
      setCurrentNotes,
      setShowMenu,
      setFocusedNote,
      setSelectionBoundings,
      setMenuOptionIndex
    );
  };
  const handleClick = () => {
    const caretPos = getSelection()?.getRangeAt(0).endOffset;
    setSelectionRange({
      elementId: note.id,
      start: caretPos,
      end: caretPos,
    });
  };

  return (
    <Wrapper>
      <Function onClick={handleRemoveNote}>
        <Remove fontSize="medium" />
      </Function>
      <Function style={{ cursor: "grab" }}>
        <DragIndicator fontSize="medium" />
      </Function>
      {(note.type === "newNote" ||
        note.type === "paragraph" ||
        note.type === "title") && (
        <div style={{ position: "relative", width: "100%" }}>
          <InputLine
            onClick={handleClick}
            ref={lineRef}
            id={note.id}
            onInput={handleTextInput}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onKeyDown={handleKeyDown}
            padding="0 7px"
            fontSize={note.type === "title" ? "25px" : "16px"}
          >
            <Text value={note.content} />
          </InputLine>
          {elementIsSelected && !note.content && <PlaceHolder note={note} />}
        </div>
      )}
      {note.type === "list" && (
        <ListContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Triangle
              showList={showList}
              onClick={() => setShowList(!showList)}
            >
              <ArrowRight fontSize="medium" />
            </Triangle>
            <InputLine
              onClick={handleClick}
              ref={lineRef}
              id={note.id}
              onInput={handleTextInput}
              contentEditable="true"
              suppressContentEditableWarning={true}
              onKeyDown={handleKeyDown}
              padding="0px"
              fontSize="16px"
            >
              <Text value={note.content} />
            </InputLine>
            {elementIsSelected && !note.content && <PlaceHolder note={note} />}
          </div>
          {showList &&
            note.listItems?.map((item) => (
              <ListComponent
                key={item.id}
                item={item}
                listParent={note}
                currentNotes={currentNotes}
                setCurrentNotes={setCurrentNotes}
              />
            ))}
        </ListContainer>
      )}
      {note.type === "divider" && (
        <DividerWrapper
          onClick={handleClick}
          elementIsSelected={elementIsSelected}
        >
          <Divider id={note.id} />
          <DividerInput
            ref={lineRef}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onKeyDown={(e) => {
              handleKeyDown(e);
              e.preventDefault();
            }}
          >
            {" "}
          </DividerInput>
        </DividerWrapper>
      )}
    </Wrapper>
  );
};
export default Element;

const Text = React.memo(
  ({ value }: { value: string }) => {
    return <>{value}</>;
  },
  (prevProps, props) => !!props.value
);

// {note.type === "image" && (
//   <ImageInput htmlFor="fileInput">
//     {!file && (
//       <>
//         <InsertPhoto
//           fontSize="large"
//           style={{ marginRight: "10px", color: "white" }}
//         />
//         Add an image
//       </>
//     )}
//     <Paragraph
//       id="fileInput"
//       type="file"
//       accept=".png, .jpeg, .jpg"
//       style={{ display: "none" }}
//       onChange={handleImage}
//     />
//     {file && <Image alt="" src={URL.createObjectURL(file)} />}
//   </ImageInput>
// )}
