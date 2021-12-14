import { NoteElement, NotesFile } from "../../App";

export const handleRemoveBlock = (
  line: NoteElement,
  lineRef: React.RefObject<HTMLDivElement>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>
) => {
  const noteId = line.id;
  if (currentNotes.notes.length === 1) {
    line.content = "";
    if (lineRef.current?.innerHTML)
      lineRef.current.childNodes[0].textContent = "";
    const currentNotesCopy = { ...currentNotes };
    setCurrentNotes(currentNotesCopy);
  }
  if (currentNotes.notes.length > 1)
    currentNotes.notes = currentNotes.notes.filter(
      (line) => line.id !== noteId
    );
  const currentNotesCopy = { ...currentNotes };
  setCurrentNotes(currentNotesCopy);
};
