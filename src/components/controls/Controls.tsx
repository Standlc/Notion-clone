import { useContext, useEffect } from "react";
import styled from "styled-components";
import { NoteElement, NotesFile, SelectionProps } from "../../App";
import { optionsData } from "../../data";
import { SelectionRangeContext } from "../../selectionRange";
import { handleListType } from "./listType";
import { handleNoteType } from "./noteType";

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
  border-radius: 8px;
  padding: 3px;
  margin-top: 30px;
  top: ${(props) => props.selectionBoundings.top}px;
  left: ${(props) => props.selectionBoundings.left}px;
  box-shadow: 0px 7px 12px 0px rgba(0, 0, 0, 0.6);
`;
const MenuItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 7px;
  margin: 3px;
  width: 170px;
  font-size: 15px;
  border-radius: 5px;
  &:hover {
    background-color: rgb(14, 21, 27);
  }
  background-color: ${(props) =>
    props.selected ? "rgba(46, 170, 220, 0.2)" : "rgba(2, 5, 8, 1)"};
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
  const noteType = (type: string) => {
    handleNoteType(
      type,
      focusedNote,
      currentNotes,
      setCurrentNotes,
      setMenuOptionIndex,
      setShowMenu,
      setSelectionRange
    );
  };
  const listType = (type: string) => {
    handleListType(
      type,
      focusedNote,
      currentNotes,
      setCurrentNotes,
      setMenuOptionIndex,
      setShowMenu,
      setSelectionRange
    );
  };
  //ENTER
  useEffect(() => {
    if (enter) {
      focusedNote?.type !== "list"
        ? noteType(optionsData.types[menuOptionIndex].type)
        : listType(optionsData.listTypes[menuOptionIndex].type);
      setMenuOptionIndex(0);
      setEnter(false);
    }
  }, [enter, menuOptionIndex, focusedNote?.type, setMenuOptionIndex, setEnter]);

  return (
    showMenu && (
      <Menu selectionBoundings={selectionBoundings}>
        {focusedNote?.type === "list"
          ? optionsData.listTypes.map((type, index) => (
              <MenuItem
                key={index}
                selected={menuOptionIndex === index}
                onClick={() => listType(type.type)}
              >
                {type.icon}
                {type.name}
              </MenuItem>
            ))
          : optionsData.types.map((type, index) => (
              <MenuItem
                key={index}
                selected={menuOptionIndex === index}
                onClick={() => noteType(type.type)}
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
