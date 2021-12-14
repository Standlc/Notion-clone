import { NoteElement, NotesFile } from "../../App";
import { Range } from "../../selectionRange";

export const handleDeleteLine = (
  e: React.KeyboardEvent<HTMLDivElement>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>,
  line: NoteElement,
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>
) => {
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const lineID = line.id;
  const lineIndex = currentNotes.notes.indexOf(line);
  const prevNode = currentNotes.notes[lineIndex - 1];
  const nextNode = currentNotes.notes[lineIndex + 1];

  if (currentNotes.notes.length === 1 && line.content === "") {
    line.type = "newNote";
    const currentNotesCopy = { ...currentNotes };
    setCurrentNotes(currentNotesCopy);
    console.log("object");
    e.preventDefault();
    return;
  }
  if (
    (caretPos === 0 &&
      prevNode?.type !== "divider" &&
      prevNode?.type !== "image") ||
    line.content === ""
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
      prevNode.content += line.content;
      prevNodeRef.childNodes[0].textContent = prevNode.content;
      currentNotes.notes = currentNotes.notes.filter(
        (line) => line.id !== lineID
      );
    }
  }
  const currentNotesCopy = { ...currentNotes };
  setCurrentNotes(currentNotesCopy);
};
