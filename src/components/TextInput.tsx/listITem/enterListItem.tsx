import { List, NoteElement, NotesFile } from "../../../App";
import { v4 } from "uuid";
import { Range } from "../../../selectionRange";

export const handleEnterListItem = (
  e: React.KeyboardEvent<HTMLDivElement>,
  listItem: List,
  listItemRef: React.RefObject<HTMLDivElement>,
  listParent: NoteElement,
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>
) => {
  e.preventDefault();
  const listItemIndex = listParent.listItems?.indexOf(listItem);
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const newListItemID = v4();
  const currentNotesCopy = { ...currentNotes };
  if (listItemIndex === undefined || caretPos === undefined) return;

  //GET OUT OF LIST CONTAINER
  if (
    listItemIndex + 1 === listParent.listItems?.length &&
    listItem.content.length === 0
  ) {
    const listParentIndex = currentNotes.notes.indexOf(listParent);
    const newLineID = v4();
    listParent.listItems = listParent.listItems?.filter(
      (item) => item.id !== listItem.id
    );
    currentNotesCopy.notes.splice(listParentIndex + 1, 0, {
      type: "newNote",
      content: "",
      id: newLineID,
    });
    setSelectionRange({
      elementId: newLineID,
      start: 0,
      end: 0,
    });
  } else {
    //FROM BEGINING OF ITEM
    if (caretPos === 0) {
      listParent.listItems?.splice(listItemIndex, 0, {
        content: "",
        id: newListItemID,
      });
    } else {
      //FROM MIDDLE OR END OF ITEM
      listParent.listItems?.splice(listItemIndex + 1, 0, {
        content: listItem.content.slice(caretPos, listItem.content.length),
        id: newListItemID,
      });
      listItem.content = listItem.content.slice(0, caretPos);
      if (listItemRef.current) {
        listItemRef.current.childNodes[0].textContent = listItem.content;
      }
      setSelectionRange({
        elementId: newListItemID,
        start: 0,
        end: 0,
      });
    }
  }
  setCurrentNotes(currentNotesCopy);
};
