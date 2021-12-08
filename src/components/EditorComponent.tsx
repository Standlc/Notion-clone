import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { NoteElement, NotesFile, SelectionProps } from "../App";
import Element from "./TextInput.tsx/Element";
import { v4 } from "uuid";
import Controls from "./Controls";
import { SelectionRangeContext } from "../selectionRange";

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
  padding-bottom: 50px;
`;
const Wrapper = styled.div`
  position: relative;
  min-width: 400px;
  max-width: 800px;
  color: white;
  width: 100%;
  padding: 50px 50px 0px 50px;
`;
const Title = styled.input`
  padding: 0 20px;
  border-radius: 5px;
  color: white;
  font-size: 50px;
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
  margin: 30px 0px;
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

  const handleNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNotesCopy = { ...currentNotes };
    currentNotesCopy.title = e.target.value;
    setCurrentNotes(currentNotesCopy);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      document.getElementById(currentNotes.notes[0].id)?.focus();
    }
  };

  const handleEditorClick = (e: any) => {
    setShowMenu(false);
    const lastNote = currentNotes.notes[currentNotes.notes.length - 1];
    if (!wrapperRef.current?.contains(e.target)) {
      const newLineId = v4();
      if (lastNote.type !== "newNote" || lastNote.content) {
        currentNotes.notes.push({
          type: "newNote",
          content: "",
          id: newLineId,
        });
        const currentNotesCopy = { ...currentNotes };
        setCurrentNotes(currentNotesCopy);
      }
      setSelectionRange({
        elementId: newLineId,
        start: 0,
        end: 0,
      });
      if (lastNote.type === "newNote" && !lastNote.content) {
        document.getElementById(lastNote.id)?.focus();
      }
    }
  };

  return (
    <Container onClick={handleEditorClick}>
      {currentNotes && (
        <>
          <Wrapper ref={wrapperRef}>
            <Title
              onKeyDown={handleKeyDown}
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
