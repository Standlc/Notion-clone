import { v4 } from "uuid";
import styled from "styled-components";
import { NoteElement, List, NotesFile } from "../App";
import { useEffect, useRef, useState } from "react";
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";

interface Props {
  item: List;
  note: NoteElement;
  currentNotes: NotesFile;
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
`;
const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
`;
const ListItem = styled.input`
  padding: 0 10px;
  margin: 1px 0;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  border: none;
  font-size: 16px;
  font-weight: 300;
  background-color: transparent;
  resize: none;
  flex: 1;
  &:focus {
    outline: none;
  }
`;

const ListComponent: React.FC<Props> = ({
  item,
  note,
  currentNotes,
  setCurrentNotes,
}) => {
  const [noteIndex, setNoteIndex] = useState(currentNotes.notes.indexOf(note));
  const [itemIndex, setItemIndex] = useState(note.listItems?.indexOf(item));
  const itemId = item.id;
  const [listTitle, setListTitle] = useState(document.getElementById(note.id));
  const [prevListItem, setPrevListItem] = useState<false | HTMLElement | null>(
    null
  );
  const [nextListItem, setNextListItem] = useState<false | HTMLElement | null>(
    null
  );
  const [textAreaRef, setTextAreaRef] = useState(
    document.getElementById(item.id)
  );

  useEffect(() => {
    setNoteIndex(currentNotes.notes.indexOf(note));
    setItemIndex(note.listItems?.indexOf(item));
    setPrevListItem(
      note.listItems !== undefined &&
        itemIndex !== undefined &&
        document.getElementById(note.listItems[itemIndex - 1]?.id)
    );
    setNextListItem(
      note.listItems !== undefined &&
        itemIndex !== undefined &&
        document.getElementById(note.listItems[itemIndex + 1]?.id)
    );
    setListTitle(document.getElementById(note.id));
    setTextAreaRef(document.getElementById(item.id));
  }, [currentNotes, itemIndex, item, note]);

  useEffect(() => {
    // if (textAreaRef) {
    //   textAreaRef.style.height = "1px";
    //   textAreaRef.style.height = `${textAreaRef?.scrollHeight}px`;
    // }
  }, [textAreaRef]);
  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (textAreaRef) {
    //   textAreaRef.style.height = "1px";
    //   textAreaRef.style.height = `${textAreaRef?.scrollHeight}px`;
    // }

    item.content = e.target.value;
    const notesCopy = { ...currentNotes };
    setCurrentNotes(notesCopy);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //ENTER NEW NOTE
    if (e.key === "Enter" && item.content) {
      note.listItems?.push({
        content: "",
        id: v4(),
      });
      const notesCopy = { ...currentNotes };
      setCurrentNotes(notesCopy);
    }
    //ENTER NEW NOTE OUTSIDE LIST
    if (e.key === "Enter" && !item.content) {
      const notesCopy = { ...currentNotes };
      note.listItems = note.listItems?.filter((item) => item.id !== itemId);
      notesCopy.notes.splice(noteIndex + 1, 0, {
        type: "newNote",
        content: "",
        id: v4(),
      });
      setCurrentNotes(notesCopy);
    }
    //DELETE NOTE
    if (e.key === "Backspace" && !item.content) {
      if (prevListItem) {
        prevListItem?.focus();
      }
      note.listItems = note.listItems?.filter((item) => item.id !== itemId);
      const notesCopy = { ...currentNotes };
      setCurrentNotes(notesCopy);
    }
    //GO UP
    if (e.key === "ArrowUp") {
      if (itemIndex === 0) {
        if (listTitle) {
          listTitle.focus();
        }
      }
      if (prevListItem) {
        prevListItem.focus();
      }
    }
    //GO DOWN
    if (e.key === "ArrowDown") {
      if (nextListItem) {
        nextListItem?.focus();
      }
    }
  };
  const handleCheckbox = (type: boolean) => {
    item.checked = type;
    const notesCopy = { ...currentNotes };
    setCurrentNotes(notesCopy);
  };

  return (
    <Wrapper>
      {note.listType === "bullets" ? (
        <Dot />
      ) : item.checked ? (
        <RadioButtonChecked
          onClick={() => handleCheckbox(false)}
          style={{ fontSize: "medium", color: "white", cursor: "pointer" }}
        />
      ) : (
        <RadioButtonUnchecked
          onClick={() => handleCheckbox(true)}
          style={{ fontSize: "medium", color: "white", cursor: "pointer" }}
        />
      )}
      <ListItem
        id={item.id}
        autoFocus
        onChange={handleText}
        onKeyDown={handleKeyDown}
        placeholder="List item"
        spellCheck="false"
        value={item.content}
      />
    </Wrapper>
  );
};

export default ListComponent;
