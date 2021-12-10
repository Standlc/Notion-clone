import { List, NoteElement, NotesFile } from "../../../App";
import { Range } from "../../../selectionRange";

export const handleDeleteListItem = (
  e: React.KeyboardEvent<HTMLDivElement>,
  listItem: List,
  listParent: NoteElement,
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>
) => {
  if (listParent.listItems === undefined) return;
  const listItemID = listItem.id;
  const listItemIndex = listParent.listItems?.indexOf(listItem);
  const prevListItem = listParent.listItems[listItemIndex - 1];
  const caretPos = getSelection()?.getRangeAt(0).endOffset;

  if (caretPos === 0) {
    e.preventDefault();
    if (prevListItem) {
      setSelectionRange({
        elementId: prevListItem.id,
        start: prevListItem.content.length,
        end: prevListItem.content.length,
      });
      const prevListItemRef = document.getElementById(prevListItem.id);
      prevListItem.content += listItem.content;
      if (prevListItemRef)
        prevListItemRef.childNodes[0].textContent = prevListItem.content;
    } else {
      const listParentRef = document.getElementById(listParent.id);
      if (!listParentRef) return;
      setSelectionRange({
        elementId: listParent.id,
        start: listParent.content.length,
        end: listParent.content.length,
      });
      listParent.content += listItem.content;
      listParentRef.childNodes[0].textContent = listParent.content;
    }
    listParent.listItems = listParent.listItems?.filter(
      (item) => item.id !== listItemID
    );
  }
  const currentNotesCopy = { ...currentNotes };
  setCurrentNotes(currentNotesCopy);
};
