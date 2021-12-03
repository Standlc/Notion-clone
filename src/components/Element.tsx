import styled from "styled-components";
import { NoteElement, NotesFile, SelectionProps } from "../App";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import ListComponent from "./ListComponent";
import { ArrowRight, DragIndicator, InsertPhoto } from "@material-ui/icons";

interface Props {
  note: NoteElement;
  currentNotes: NotesFile;
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusedNote: React.Dispatch<React.SetStateAction<NoteElement | undefined>>;
  setSelectionBoundings: React.Dispatch<
    React.SetStateAction<SelectionProps["selectionBoundings"]>
  >;
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;
const Functions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  visibility: hidden;
  margin: 0 5px;
  color: rgb(173, 173, 173);
  border-radius: 5px;
  &:hover {
    background-color: rgb(5, 10, 15);
  }
  cursor: pointer;
`;
const Triangle = styled.div<{ showList: Boolean }>`
  margin: 0 5px;
  color: rgb(173, 173, 173);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transform: ${(props) => (props.showList ? "rotate(90deg)" : "rotate(0)")};
  transition: transform 200ms;
`;
const Title = styled.input`
  padding: 10px 10px;
  border-radius: 5px;
  color: white;
  font-size: 35px;
  border: none;
  background-color: transparent;
  width: 100%;
  resize: none;
  transition: background-color 100ms;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;
const Paragraph = styled.input`
  padding: 0 10px;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 300;
  background-color: transparent;
  width: 100%;
  resize: none;
  transition: background-color 100ms;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;
const ListContainer = styled.div`
  padding: 10px 0px;
  margin: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  transition: background-color 100ms;
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;
const List = styled.input`
  margin-bottom: 5px;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 300;
  resize: none;
  background-color: transparent;
  width: 100%;
  text-decoration: underline;
  text-underline-position: under;
  &:focus {
    outline: none;
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
  display: flex;
  align-items: center;
  &:hover ${Functions} {
    visibility: visible;
  }
`;
const Image = styled.img`
  height: 250px;
  border-radius: 5px;
  object-fit: contain;
  margin: 15px 0;
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
  setShowMenu,
  setFocusedNote,
  setSelectionBoundings,
}) => {
  const [noteIndex, setNoteIndex] = useState(currentNotes.notes.indexOf(note));
  const noteId = note.id;
  const [prevNote, setPrevNote] = useState<false | HTMLElement | null>(null);
  const [nextNote, setNextNote] = useState<false | HTMLElement | null>(null);
  const [noteRef, setNoteRef] = useState<false | HTMLElement | null>(null);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    setNoteIndex(currentNotes.notes.indexOf(note));
    setPrevNote(document.getElementById(currentNotes.notes[noteIndex - 1]?.id));
    setNextNote(document.getElementById(currentNotes.notes[noteIndex + 1]?.id));
    setNoteRef(document.getElementById(note.id));
  }, [currentNotes, note, noteIndex]);

  const autoGrow = () => {
    // if (noteRef) {
    //   noteRef.style.height = "1px";
    //   noteRef.style.height = `${noteRef?.scrollHeight}px`;
    // }
  };
  useEffect(() => {
    autoGrow();
  }, [noteRef]);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    autoGrow();
    note.content = e.target.value;
    const notesCopy = { ...currentNotes };
    setCurrentNotes(notesCopy);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //ENTER NEW NOTE
    if (e.key === "Enter") {
      const notesCopy = { ...currentNotes };
      const newNoteId = v4();
      if (note.type === "list") {
        note.listItems?.push({
          content: "",
          id: v4(),
        });
        setCurrentNotes(notesCopy);
        return;
      }
      notesCopy.notes.splice(noteIndex + 1, 0, {
        type: "newNote",
        content: "",
        id: newNoteId,
      });
      setCurrentNotes(notesCopy);
    }
    //OPEN MENU
    if (e.key === "/") {
      setShowMenu(true);
      setFocusedNote(note);
      if (noteRef) {
        setSelectionBoundings({
          top: noteRef?.getBoundingClientRect().top,
          left: 0,
        });
      }
    } else {
      setShowMenu(false);
    }
    //DELETE NOTE
    if (e.key === "Backspace" && !note.content) {
      if (prevNote) {
        prevNote?.focus();
      }
      currentNotes.notes = currentNotes.notes.filter(
        (note) => note.id !== noteId
      );
      if (currentNotes.notes.length === 0) {
        currentNotes.notes.push({
          type: "newNote",
          content: "",
          id: v4(),
        });
      }
      const currentNotesCopy = { ...currentNotes };
      setCurrentNotes(currentNotesCopy);
    }
    //GO UP
    if (e.key === "ArrowUp") {
      if (prevNote) {
        prevNote?.focus();
      }
    }
    //GO DOWN
    if (e.key === "ArrowDown") {
      if (nextNote) {
        nextNote?.focus();
      }
    }
  };

  const [file, setFile] = useState(null);

  const handleImage = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <Container>
      {note.type === "title" && (
        <Wrapper>
          <Functions>
            <DragIndicator fontSize="medium" />
          </Functions>
          <Title
            id={note.id}
            autoFocus
            onChange={handleText}
            onKeyDown={handleKeyDown}
            placeholder="Title"
            spellCheck="false"
            value={note.content}
          />
        </Wrapper>
      )}
      {note.type === "paragraph" && (
        <Wrapper>
          <Functions>
            <DragIndicator fontSize="medium" />
          </Functions>
          <Paragraph
            id={note.id}
            autoFocus
            onChange={handleText}
            onKeyDown={handleKeyDown}
            placeholder="Paragraph"
            spellCheck="false"
            value={note.content}
          />
        </Wrapper>
      )}
      {note.type === "list" && (
        <Wrapper>
          <Functions>
            <DragIndicator fontSize="medium" />
          </Functions>
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
                placeholder="List"
                spellCheck="false"
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
        </Wrapper>
      )}
      {note.type === "image" && (
        <Wrapper>
          <Functions>
            <DragIndicator fontSize="medium" />
          </Functions>
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
        </Wrapper>
      )}
      {note.type === "newNote" && (
        <Wrapper>
          <Functions>
            <DragIndicator fontSize="medium" />
          </Functions>
          <Paragraph
            id={note.id}
            // onInput={handleInput}
            // contentEditable="true"
            // html='oijuhg'
            // placeholder={
            //   noteIndex + 1 === currentNotes.notes.length
            //     ? "Type '/' for commands"
            //     : ""
            // }
            autoFocus
            placeholder="Type '/' for commands"
            value={note.content}
            spellCheck="false"
            onChange={handleText}
            onKeyDown={handleKeyDown}
          />
        </Wrapper>
      )}
      {note.type === "divider" && (
        <Wrapper>
          <Functions>
            <DragIndicator fontSize="medium" />
          </Functions>
          <Divider id={note.id} key={note.id} />
        </Wrapper>
      )}
    </Container>
  );
};

export default Element;
