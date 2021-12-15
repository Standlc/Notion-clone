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
  HiddenInput,
  DividerWrapper,
  Function,
  Image,
  ImageInput,
  InputLine,
  ListContainer,
  Triangle,
  Wrapper,
  DragHandleWrapper,
} from "./elementsStyled";
import { MouseSelectionContext } from "../../mouseSelectionRect";
import { handleRemoveBlock } from "./removeLine";
import { handleIsSelected } from "./isSelected";
import { ResizedDistanceContext } from "../../resizedDistanceContext";
import { handleStoreImage } from "./storeImage";
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
  selectedBlocks: string[];
  setSelectedBlocks: React.Dispatch<React.SetStateAction<string[]>>;
  enableSelection: boolean;
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
  selectedBlocks,
  setSelectedBlocks,
  enableSelection,
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showList, setShowList] = useState(true);
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext
  );
  const [elementIsSelected, setElementIsSelected] = useState<boolean>(false);
  const [isMouseSelected, setIsMouseSelected] = useState<boolean>(false);
  const { mouseSelection, setMouseSelection } = useContext(
    MouseSelectionContext
  );
  const { setResizedDistance, resizedDistance } = useContext(
    ResizedDistanceContext
  );
  useEffect(() => {
    handleIsSelected(
      note.id,
      wrapperRef,
      mouseSelection,
      selectedBlocks,
      setSelectedBlocks,
      setIsMouseSelected
    );
  }, [mouseSelection]);

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
  }, [selectionRange, note.id]);

  const removeBlock = () => {
    handleRemoveBlock(note, lineRef, currentNotes, setCurrentNotes);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (showMenu && (e.key === "ArrowLeft" || e.key === "ArrowRight"))
      e.preventDefault();
    //ENTER NEW NOTE
    if (e.key === "Enter" && !showMenu) {
      setMouseSelection({
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        bottomOrigin: 0,
        topOrigin: 0,
        leftOrigin: 0,
        rightOrigin: 0,
      });
      handleNewLine(
        e,
        currentNotes,
        setCurrentNotes,
        note,
        lineRef,
        setSelectionRange,
        setShowList
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
      setMouseSelection({
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        bottomOrigin: 0,
        topOrigin: 0,
        leftOrigin: 0,
        rightOrigin: 0,
      });
      handleDeleteLine(
        e,
        currentNotes,
        setCurrentNotes,
        note,
        setSelectionRange
      );
    }
    //LINE NAVIGATION
    if ((e.key === "ArrowUp" || e.key === "ArrowDown") && !showMenu) {
      handleLineNavigation(e, setSelectionRange, note, currentNotes);
    }
  };
  //IMAGE
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleStoreImage(e, note, currentNotes, setCurrentNotes);
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
  const initializeResize = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setResizedDistance({ distance: 0, initialPos: e.pageX });
    setElementIsSelected(true);
  };
  const [imageWidth, setImageWidth] = useState<number | undefined>();
  useEffect(() => {
    setImageWidth(imageRef.current?.getBoundingClientRect().width);
  }, [resizedDistance.initialPos]);
  useLayoutEffect(() => {
    if (imageRef.current && imageWidth && elementIsSelected) {
      if (imageWidth - resizedDistance.distance < 300) {
        imageRef.current.style.width = `300px`;
      } else
        imageRef.current.style.width = `${
          imageWidth - resizedDistance.distance
        }px`;
      if (resizedDistance.initialPos === 0) {
        setElementIsSelected(false);
        if (imageWidth - resizedDistance.distance < 300) {
          imageRef.current.style.width = `300px`;
        } else
          imageRef.current.style.width = `${
            imageWidth - resizedDistance.distance
          }px`;
      }
    }
  }, [resizedDistance]);
  return (
    <Wrapper
      onMouseDown={(e) => e.stopPropagation()}
      isMouseSelected={isMouseSelected}
      ref={wrapperRef}
    >
      <Function onClick={removeBlock}>
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
            spellCheck="false"
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
            <div style={{ position: "relative", width: "100%" }}>
              <InputLine
                style={{
                  textDecoration: "underline",
                  textUnderlinePosition: "under",
                }}
                spellCheck="false"
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
              {elementIsSelected && !note.content && (
                <PlaceHolder note={note} />
              )}
            </div>
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
          <Divider />
          <HiddenInput
            id={note.id}
            ref={lineRef}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onKeyDown={(e) => {
              handleKeyDown(e);
              e.preventDefault();
            }}
          >
            {" "}
          </HiddenInput>
        </DividerWrapper>
      )}
      {note.type === "image" && (
        <ImageInput
          onClick={() => console.log(note)}
          ref={imageRef}
          elementIsSelected={elementIsSelected}
          htmlFor={note.id + 1}
        >
          {!note.img && (
            <>
              <InsertPhoto
                fontSize="large"
                style={{ marginRight: "5px", color: "white" }}
              />
              Add an image
              <input
                id={note.id + 1}
                type="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={handleImage}
              />
            </>
          )}
          {note.img && (
            <>
              <Image alt="" src={note.img} />
              <DragHandleWrapper onMouseDown={initializeResize} side="right" />
            </>
          )}
          <HiddenInput
            id={note.id}
            ref={lineRef}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onKeyDown={(e) => {
              handleKeyDown(e);
              e.preventDefault();
            }}
          >
            {" "}
          </HiddenInput>
        </ImageInput>
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
