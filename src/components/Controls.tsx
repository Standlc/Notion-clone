import { useContext, useEffect } from "react";
import styled from "styled-components";
import { NoteElement, NotesFile, SelectionProps } from "../App";
import { optionsData } from "../data";
import { SelectionRangeContext } from "../selectionRange";

type Props = {
  showMenu: Boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  focusedNote: NoteElement | undefined;
  currentNotes: NotesFile;
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>;
  selectionBoundings: SelectionProps["selectionBoundings"];
  menuOptionIndex: number;
  setMenuOptionIndex: React.Dispatch<React.SetStateAction<number>>;
  enter: boolean;
  setEnter: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = styled.div<SelectionProps>`
  position: absolute;
  z-index: 99;
  background-color: rgba(2, 5, 8, 1);
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin-top: 30px;
  top: ${(props) => props.selectionBoundings.top}px;
  left: ${(props) => props.selectionBoundings.left}px;
  box-shadow: 0px 7px 12px 0px rgba(0, 0, 0, 0.6);
`;
const MenuItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 150px;
  border-radius: 5px;
  &:hover {
    background-color: rgb(14, 21, 27);
  }
  background-color: ${(props) =>
    props.selected ? "rgb(14, 21, 27)" : "rgba(2, 5, 8, 1)"};
  transition: background-color 100ms;
  cursor: pointer;
`;

const Controls: React.FC<Props> = ({
  showMenu,
  setShowMenu,
  focusedNote,
  currentNotes,
  setCurrentNotes,
  selectionBoundings,
  menuOptionIndex,
  setMenuOptionIndex,
  enter,
  setEnter,
}) => {
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext
  );
  const handleNoteType = (type: string) => {
    if (focusedNote) {
      const currentNotesCopy = { ...currentNotes };
      const noteCopy = currentNotes.notes.find(
        (note) => note.id === focusedNote.id
      );
      focusedNote.content = focusedNote.content.slice(0, -1);
      const currentLine = document.getElementById(focusedNote.id);
      if (currentLine)
        currentLine.childNodes[0].textContent = focusedNote.content;
      setSelectionRange({
        elementId: focusedNote.id,
        start: focusedNote.content.length,
        end: focusedNote.content.length,
      });
      focusedNote.listItems?.map((listItem) => (listItem.checked = false));
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
    setMenuOptionIndex(0);
    setShowMenu(false);
  };
  const handleListType = (type: string) => {
    if (focusedNote) {
      focusedNote.listType = type;
      focusedNote.content = focusedNote.content.slice(0, -1);
      const currentLine = document.getElementById(focusedNote.id);
      if (currentLine)
        currentLine.childNodes[0].textContent = focusedNote.content;
      setSelectionRange({
        elementId: focusedNote.id,
        start: focusedNote.content.length,
        end: focusedNote.content.length,
      });
      focusedNote.listItems?.map((listItem) => (listItem.checked = false));
      const currentNotesCopy = { ...currentNotes };
      setCurrentNotes(currentNotesCopy);
    }
    setShowMenu(false);
  };
  //ENTER
  useEffect(() => {
    if (enter) {
      focusedNote?.type !== "list"
        ? handleNoteType(optionsData.types[menuOptionIndex].type)
        : handleListType(optionsData.listTypes[menuOptionIndex].type);
      setMenuOptionIndex(0);
      setEnter(false);
    }
  }, [enter, menuOptionIndex, setEnter]);

  return (
    showMenu && (
      <Menu selectionBoundings={selectionBoundings}>
        {focusedNote?.type === "list"
          ? optionsData.listTypes.map((type, index) => (
              <MenuItem
                key={index}
                selected={menuOptionIndex === index}
                onClick={() => handleListType(type.type)}
              >
                {type.icon}
                {type.name}
              </MenuItem>
            ))
          : optionsData.types.map((type, index) => (
              <MenuItem
                key={index}
                selected={menuOptionIndex === index}
                onClick={() => handleNoteType(type.type)}
              >
                {type.icon}
                {type.name}
              </MenuItem>
            ))}
      </Menu>
    )
  );
};

export default Controls;
