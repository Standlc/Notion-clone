import styled from "styled-components";
import { NoteElement, NotesFile, SelectionProps } from "../../App";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ListComponent from "../ListComponent";
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
const Function = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  visibility: hidden;
  margin-right: 2px;
  color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  &:hover {
    background-color: rgb(5, 10, 15);
  }
  cursor: pointer;
`;
const Triangle = styled.div<{ showList: Boolean }>`
  margin: 0 5px;
  color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transform: ${(props) => (props.showList ? "rotate(90deg)" : "rotate(0)")};
  transition: transform 200ms;
`;
const InputLine = styled.div<{ padding: string; fontSize: string }>`
  white-space: pre-wrap;
  word-break: break-word;
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  border-radius: 5px;
  color: white;
  font-weight: 300;
  background-color: transparent;
  transition: background-color 100ms;
  flex: 1;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;
const ListContainer = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 5px;
  transition: background-color 100ms;
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 10px 0px;
`;
const Wrapper = styled.div`
  width: 100%;
  margin: 2px 0;
  display: flex;
  align-items: center;
  &:hover ${Function} {
    visibility: visible;
  }
`;
const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  object-fit: contain;
`;
const ImageInput = styled.label`
  padding: 7px;
  width: 100%;
  background-color: rgb(20, 30, 37);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: background-color 100ms;
  color: gray;
  &:hover {
    background-color: rgb(27, 40, 49);
  }
`;

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
  const [lineIndex, setLineIndex] = useState(currentNotes.notes.indexOf(note));
  const noteId = note.id;
  const [prevNote, setPrevNote] = useState<HTMLElement | null>(null);
  const [nextNote, setNextNote] = useState<HTMLElement | null>(null);
  const lineRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [showList, setShowList] = useState(true);
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext
  );

  useEffect(() => {
    setLineIndex(currentNotes.notes.indexOf(note));
    setPrevNote(document.getElementById(currentNotes.notes[lineIndex - 1]?.id));
    setNextNote(document.getElementById(currentNotes.notes[lineIndex + 1]?.id));
  }, [currentNotes, note, lineIndex]);

  const range = new Range();
  useLayoutEffect(() => {
    if (selectionRange.elementId !== note.id) return;
    const childNode = lineRef.current?.childNodes[0];
    if (childNode === undefined) return;
    range.setStart(childNode, selectionRange.start);
    range.setEnd(childNode, selectionRange.end);
    getSelection()?.removeAllRanges();
    getSelection()?.addRange(range);
  }, [selectionRange]);

  //DELETE NOTE
  const handleRemoveNote = () => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      handleLineNavigation(e, prevNote, lineRef, setSelectionRange);
    }
    //GO DOWN
    if (e.key === "ArrowDown" && !showMenu) {
      handleLineNavigation(e, nextNote, lineRef, setSelectionRange);
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
            ref={lineRef}
            id={note.id}
            onInput={handleTextInput}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onKeyDown={handleKeyDown}
            padding="0 10px"
            fontSize={note.type === "title" ? "25px" : "16px"}
          >
            <Text value={note.content} />
          </InputLine>
          {!note.content && <PlaceHolder note={note} />}
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
            {!note.content && <PlaceHolder note={note} />}
          </div>
          {showList &&
            note.listItems?.map((item) => (
              <ListComponent
                key={item.id}
                item={item}
                note={note}
                currentNotes={currentNotes}
                setCurrentNotes={setCurrentNotes}
              />
            ))}
        </ListContainer>
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

{
  /* {note.type === "divider" && <Divider id={note.id} key={note.id} />} */
}
{
  /* {note.type === "title" && (
          <Title
            id={note.id}
            autoFocus
            onChange={handleText}
            onKeyDown={handleKeyDown}
            placeholder="Title"
            value={note.content}
          />
        )} */
}
{
  /* {note.type === "paragraph" && (
          <Paragraph
            id={note.id}
            autoFocus
            onChange={handleText}
            onKeyDown={handleKeyDown}
            placeholder="Paragraph"
            value={note.content}
          />
        )} */
}
{
  /* {note.type === "list" && (
          <ListContainer>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Triangle
                showList={showList}
                onClick={() => setShowList(!showList)}
              >
                <ArrowRight fontSize="medium" />
              </Triangle>
              <List
                id={note.id}
                autoFocus
                onChange={handleText}
                onKeyDown={handleKeyDown}
                placeholder="List title :"
                value={note.content}
              />
            </div>
            {showList &&
              note.listItems?.map((item) => (
                <ListComponent
                  key={item.id}
                  item={item}
                  note={note}
                  currentNotes={currentNotes}
                  setCurrentNotes={setCurrentNotes}
                />
              ))}
          </ListContainer>
        )}
        {note.type === "image" && (
          <ImageInput htmlFor="fileInput">
            {!file && (
              <>
                <InsertPhoto
                  fontSize="large"
                  style={{ marginRight: "10px", color: "white" }}
                />
                Add an image
              </>
            )}
            <Paragraph
              id="fileInput"
              type="file"
              accept=".png, .jpeg, .jpg"
              style={{ display: "none" }}
              onChange={handleImage}
            />
            {file && <Image alt="" src={URL.createObjectURL(file)} />}
          </ImageInput>
        )} */
}
