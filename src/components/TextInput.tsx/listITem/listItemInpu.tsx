import { List, NotesFile } from "../../../App";

export const handleListItemInput = (
  listItem: List,
  listItemRef: React.RefObject<HTMLDivElement>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>
) => {
  if (listItemRef.current?.innerHTML === undefined) return;

  listItem.content = listItemRef.current?.innerHTML;
  const notesCopy = { ...currentNotes };
  setCurrentNotes(notesCopy);
};
