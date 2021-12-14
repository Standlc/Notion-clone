import { NoteElement, NotesFile } from "../../App";
import { Range } from "../../selectionRange";

export const handleDeleteLine = (
  e: React.KeyboardEvent<HTMLDivElement>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>,
  note: NoteElement,
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>
) => {
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const lineID = note.id;
  const lineIndex = currentNotes.notes.indexOf(note);
  const prevNode = currentNotes.notes[lineIndex - 1];
  const nextNode = currentNotes.notes[lineIndex + 1];

  if (currentNotes.notes.length === 1 && note.content.length === 0) {
    e.preventDefault();
    return;
  }
  if (
    (caretPos === 0 &&
      prevNode?.type !== "divider" &&
      prevNode?.type !== "image") ||
    note.content === ""
  ) {
    e.preventDefault();
    if (lineIndex === 0) {
      setSelectionRange({
        elementId: nextNode.id,
        start: nextNode.content.length,
        end: nextNode.content.length,
      });
      currentNotes.notes = currentNotes.notes.filter(
        (line) => line.id !== lineID
      );
    } else {
      const prevNodeRef = document.getElementById(prevNode.id);
      setSelectionRange({
        elementId: prevNode.id,
        start: prevNode.content.length,
        end: prevNode.content.length,
      });
      if (!prevNodeRef) return;
      prevNode.content += note.content;
      prevNodeRef.childNodes[0].textContent = prevNode.content;
      currentNotes.notes = currentNotes.notes.filter(
        (line) => line.id !== lineID
      );
    }
  }
  const currentNotesCopy = { ...currentNotes };
  setCurrentNotes(currentNotesCopy);
};
