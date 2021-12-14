import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { NoteElement, NotesFile, SelectionProps } from "../App";
import Element from "./TextInput.tsx/Element";
import { v4 } from "uuid";
import Controls from "./controls/Controls";
import { SelectionRangeContext } from "../selectionRange";
import { MouseSelectionContext } from "../mouseSelectionRect";
import { handleInitializingSelection } from "./mouseSelectionFunctions/initialize";
import { handleSelectionDimensions } from "./mouseSelectionFunctions/dimisensions";
import { handleStopSelecting } from "./mouseSelectionFunctions/stopSelecting";
import { handleResizing } from "./TextInput.tsx/resizingImage/resizing";
import { handleStopResizing } from "./TextInput.tsx/resizingImage/stopResizing";
import { ResizedDistanceContext } from "../resizedDistanceContext";

type Props = {
  currentNotes: NotesFile;
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>;
};
const Container = styled.div`
  flex: 4;
  display: flex;
  align-items: start;
  justify-content: center;
  overflow-y: auto;
  padding-bottom: 280px;
`;
const Wrapper = styled.div`
  position: relative;
  min-width: 400px;
  max-width: 800px;
  color: white;
  width: 100%;
  padding: 30px 50px 0px 50px;
`;
const Title = styled.input`
  padding: 0 20px;
  border-radius: 10px;
  color: white;
  font-size: 40px;
  font-weight: 600;
  border: none;
  background-color: rgb(5, 10, 15);
  width: calc(100% - 40px);
  resize: none;
  &:focus {
    outline: none;
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 20px 0px;
`;
const SelectRect = styled.div`
  position: fixed;
  z-index: 99;
  background-color: rgba(46, 170, 220, 0.2);
  visibility: hidden;
  border-radius: 5px;
`;

const EditorComponent: React.FC<Props> = ({
  currentNotes,
  setCurrentNotes,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectionBoundings, setSelectionBoundings] = useState<
    SelectionProps["selectionBoundings"]
  >({
    top: 0,
    left: 0,
  });
  const [focusedNote, setFocusedNote] = useState<NoteElement | undefined>(
    undefined
  );
  const [menuOptionIndex, setMenuOptionIndex] = useState<number>(0);
  const [enter, setEnter] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext
  );
  const { mouseSelection, setMouseSelection } = useContext(
    MouseSelectionContext
  );
  const { setResizedDistance, resizedDistance } = useContext(
    ResizedDistanceContext
  );

  const handleNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNotesCopy = { ...currentNotes };
    currentNotesCopy.title = e.target.value;
    setCurrentNotes(currentNotesCopy);
  };

  const handleKeyDownTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();
      setSelectionRange({
        elementId: currentNotes.notes[0].id,
        start: currentNotes.notes[0].content.length,
        end: currentNotes.notes[0].content.length,
      });
    }
  };

  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const selectionRectRef = useRef<HTMLDivElement | null>(null);
  const [enableSelection, setEnableSelection] = useState(false);
  const initializingSelection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleInitializingSelection(
      e,
      setEnableSelection,
      setMouseSelection,
      setSelectedBlocks
    );
  };

  const selectionDimensions = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleSelectionDimensions(
      e,
      enableSelection,
      mouseSelection,
      selectionRectRef,
      setMouseSelection
    );
    handleResizing(e, resizedDistance, setResizedDistance);
  };
  const stopSelecting = () => {
    handleStopSelecting(selectionRectRef, setEnableSelection);
    handleStopResizing(resizedDistance,setResizedDistance);
  };

  const handleEditorClick = (e: any) => {
    setShowMenu(false);
    setMenuOptionIndex(0);
    const lastBlock = currentNotes.notes[currentNotes.notes.length - 1];
    if (!wrapperRef.current?.contains(e.target)) {
      const newBlockID = v4();
      if (lastBlock.type !== "newNote" || lastBlock.content) {
        setCurrentNotes({
          ...currentNotes,
          notes: [
            ...currentNotes.notes,
            {
              type: "newNote",
              content: "",
              id: newBlockID,
            },
          ],
        });
      }
      setSelectionRange({
        elementId: newBlockID,
        start: 0,
        end: 0,
      });
      if (lastBlock.type === "newNote" && !lastBlock.content) {
        setSelectionRange({
          elementId: lastBlock.id,
          start: 0,
          end: 0,
        });
      }
    }
  };

  return (
    <Container
      onMouseDown={initializingSelection}
      onMouseMove={selectionDimensions}
      onMouseUp={stopSelecting}
      onClick={handleEditorClick}
    >
      {currentNotes && (
        <>
          <Wrapper ref={wrapperRef}>
            <SelectRect ref={selectionRectRef} />
            <Title
              onKeyDown={handleKeyDownTitle}
              spellCheck="false"
              placeholder="Untitled"
              onChange={handleNoteTitle}
              value={currentNotes.title}
            />
            <Divider />
            {currentNotes.notes?.map((note) => (
              <Element
                key={note.id}
                note={note}
                currentNotes={currentNotes}
                setCurrentNotes={setCurrentNotes}
                setFocusedNote={setFocusedNote}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                setSelectionBoundings={setSelectionBoundings}
                menuOptionIndex={menuOptionIndex}
                setMenuOptionIndex={setMenuOptionIndex}
                enter={enter}
                setEnter={setEnter}
                selectedBlocks={selectedBlocks}
                setSelectedBlocks={setSelectedBlocks}
                enableSelection={enableSelection}
              />
            ))}
          </Wrapper>
          <Controls
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            currentNotes={currentNotes}
            setCurrentNotes={setCurrentNotes}
            focusedNote={focusedNote}
            selectionBoundings={selectionBoundings}
            menuOptionIndex={menuOptionIndex}
            setMenuOptionIndex={setMenuOptionIndex}
            enter={enter}
            setEnter={setEnter}
          />
        </>
      )}
    </Container>
  );
};

export default EditorComponent;
