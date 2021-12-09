import { List, NoteElement, NotesFile } from "../../../App";
import { Range } from "../../../selectionRange";

export const handleDeleteListItem = (
  e: React.KeyboardEvent<HTMLDivElement>,
  listItem: List,
  listItemRef: React.RefObject<HTMLDivElement>,
  listParent: NoteElement,
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>
) => {
  if (listParent.listItems === undefined) return;
  const listItemID = listItem.id;
  const listItemIndex = listParent.listItems?.indexOf(listItem);
  const prevListItem = listParent.listItems[listItemIndex - 1];

  if (listItem.content.length !== 0) return;
  e.preventDefault();
  listParent.listItems = listParent.listItems?.filter(
    (item) => item.id !== listItemID
  );
  if (prevListItem) {
    setSelectionRange({
      elementId: prevListItem.id,
      start: prevListItem.content.length,
      end: prevListItem.content.length,
    });
  } else {
    setSelectionRange({
        elementId: listParent.id,
        start: listParent.content.length,
        end: listParent.content.length,
      });
  }
  const currentNotesCopy = { ...currentNotes };
  setCurrentNotes(currentNotesCopy);
};
