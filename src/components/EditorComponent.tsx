import {
  FormatListBulleted,
  InsertPhoto,
  RadioButtonChecked,
  ShortText,
  TitleOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { NoteElement, NotesFile, SelectionProps } from "../App";
import Element from "./Element";

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
`;
const Wrapper = styled.div`
  position: relative;
  width: 75%;
  min-width: 450px;
  max-width: 800px;
  color: white;
  border-radius: 10px;
  padding: 50px;
  &:focus {
    outline: none;
  }
`;
const Menu = styled.div<SelectionProps>`
  position: absolute;
  z-index: 99;
  background-color: rgba(2, 5, 8, 1);
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin-left: 30px;
  top: ${(props) =>
    props.selectionBoundings.top ? props.selectionBoundings.top + 40 : 0}px;
  left: 80px;
  box-shadow: 0px 7px 12px 0px rgba(0, 0, 0, 0.6);
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 150px;
  border-radius: 5px;
  &:hover {
    background-color: rgb(14, 21, 27);
  }
  transition: background-color 100ms;
  cursor: pointer;
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
  console.log(currentNotes)
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

  const handleNoteType = (type: string) => {
    if (focusedNote) {
      const currentNotesCopy = { ...currentNotes };
      const noteCopy = currentNotes.notes.find(
        (note) => note.id === focusedNote.id
      );
      focusedNote.content = focusedNote.content.slice(0, -1);
      if (type === "list") {
        if (noteCopy) {
          noteCopy.listItems = [];
          noteCopy.listType = "bullets";
        }
      }
      if (type === "image") {
        if (noteCopy) {
          noteCopy.img = "";
        }
      }
      if (focusedNote) {
        focusedNote.type = type;
        setCurrentNotes(currentNotesCopy);
      }
    }
    setShowMenu(false);
  };

  const handleListType = (type: string) => {
    if (focusedNote) {
      focusedNote.listType = type;
      focusedNote.content = focusedNote.content.slice(0, -1);
      focusedNote.listItems?.map((listItem) => (listItem.checked = false));
      const currentNotesCopy = { ...currentNotes };
      setCurrentNotes(currentNotesCopy);
    }
    setShowMenu(false);
  };
  const handleNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNotesCopy = { ...currentNotes };
    currentNotesCopy.title = e.target.value;
    setCurrentNotes(currentNotesCopy);
  };
  return (
    <Container onClick={() => setShowMenu(false)}>
      <Wrapper>
        <Title
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
            setShowMenu={setShowMenu}
            setSelectionBoundings={setSelectionBoundings}
          />
        ))}
        {showMenu && (
          <Menu selectionBoundings={selectionBoundings}>
            {focusedNote?.type === "list" ? (
              <>
                <MenuItem onClick={() => handleListType("bullets")}>
                  <FormatListBulleted style={{ marginRight: "10px" }} />
                  Bullets
                </MenuItem>
                <MenuItem onClick={() => handleListType("checkbox")}>
                  <RadioButtonChecked style={{ marginRight: "10px" }} />
                  Checkbox
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleNoteType("title")}>
                  <TitleOutlined style={{ marginRight: "10px" }} />
                  Title
                </MenuItem>
                <MenuItem onClick={() => handleNoteType("paragraph")}>
                  <ShortText style={{ marginRight: "10px" }} />
                  Paragraph
                </MenuItem>
                <MenuItem onClick={() => handleNoteType("list")}>
                  <FormatListBulleted style={{ marginRight: "10px" }} />
                  List
                </MenuItem>
                <MenuItem onClick={() => handleNoteType("divider")}>
                  <div
                    style={{
                      width: "20px",
                      height: "2px",
                      backgroundColor: "white",
                      marginRight: "14px",
                    }}
                  ></div>
                  Divider
                </MenuItem>
                <MenuItem onClick={() => handleNoteType("image")}>
                  <InsertPhoto style={{ marginRight: "10px" }} />
                  Image
                </MenuItem>
              </>
            )}
          </Menu>
        )}
      </Wrapper>
    </Container>
  );
};

export default EditorComponent;