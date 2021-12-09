import { List, NoteElement, NotesFile } from "../../../App";

export const handleListItemInput = (
  e: React.FormEvent<HTMLDivElement>,
  listItem: List,
  listItemRef: React.RefObject<HTMLDivElement>,
  listParent: NoteElement,
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>
) => {
  if (listItemRef.current?.innerHTML === undefined) return;

  listItem.content = listItemRef.current?.innerHTML;
  const notesCopy = { ...currentNotes };
  setCurrentNotes(notesCopy);
};
