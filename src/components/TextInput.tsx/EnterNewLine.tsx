import { NoteElement, NotesFile } from "../../App";
import { v4 } from "uuid";
import { Range } from "../../selectionRange";

export const handleNewLine = (
  e: React.KeyboardEvent<HTMLDivElement>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>,
  note: NoteElement,
  lineRef: React.RefObject<HTMLDivElement>,
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>
) => {
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const lineIndex = currentNotes.notes.indexOf(note);
  e.preventDefault();
  if (caretPos === undefined) return;
  const newNoteId = v4();
  const notesCopy = { ...currentNotes };

  //LIST
  if (note.type === "list") {
    note.listItems?.push({
      content: "",
      id: v4(),
    });
    setCurrentNotes(notesCopy);
    return;
  }
  //FROM END OF LINE
  if (caretPos === note.content.length) {
    notesCopy.notes.splice(lineIndex + 1, 0, {
      type: "newNote",
      content: "",
      id: newNoteId,
    });
  }
  //FROM MIDDLE OR BEGINNING OF LINE
  if (caretPos < note.content.length) {
    notesCopy.notes.splice(lineIndex + 1, 0, {
      type: "newNote",
      content: note.content.slice(caretPos, note.content.length),
      id: newNoteId,
    });
    note.content = note.content.slice(0, caretPos);
    if (lineRef.current) {
      lineRef.current.childNodes[0].textContent = note.content;
    }
  }
  setCurrentNotes(notesCopy);
  setSelectionRange({
    elementId: newNoteId,
    start: 0,
    end: 0,
  });
};
