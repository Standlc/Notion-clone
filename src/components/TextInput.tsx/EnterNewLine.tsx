import { NoteElement, NotesFile } from "../../App";
import { v4 } from "uuid";
import { Range } from "../../selectionRange";

export const handleNewLine = (
  e: React.KeyboardEvent<HTMLDivElement>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>,
  note: NoteElement,
  lineRef: React.RefObject<HTMLDivElement>,
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>,
  setShowList: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const lineIndex = currentNotes.notes.indexOf(note);
  e.preventDefault();
  if (caretPos === undefined) return;
  const newLineID = v4();
  const notesCopy = { ...currentNotes };

  //LIST
  if (note.type === "list") {
    setShowList(true);
    if (caretPos === 0) {
      notesCopy.notes.splice(lineIndex, 0, {
        type: "newNote",
        content: "",
        id: newLineID,
      });
    } else {
      note.listItems?.unshift({
        content: note.content.slice(caretPos, note.content.length),
        id: newLineID,
      });
      note.content = note.content.slice(0, caretPos);
      if (lineRef.current) {
        lineRef.current.childNodes[0].textContent = note.content;
      }
      setSelectionRange({
        elementId: newLineID,
        start: 0,
        end: 0,
      });
    }
    setCurrentNotes(notesCopy);
    return;
  }
  //FROM MIDDLE OR END OF LINE
  if (caretPos > 0) {
    notesCopy.notes.splice(lineIndex + 1, 0, {
      type: "newNote",
      content: note.content.slice(caretPos, note.content.length),
      id: newLineID,
    });
    note.content = note.content.slice(0, caretPos);
    if (lineRef.current) {
      lineRef.current.childNodes[0].textContent = note.content;
    }
    setSelectionRange({
      elementId: newLineID,
      start: 0,
      end: 0,
    });
  }
  //FROM POSITION 0
  if (caretPos === 0) {
    notesCopy.notes.splice(lineIndex, 0, {
      type: "newNote",
      content: "",
      id: newLineID,
    });
  }
  setCurrentNotes(notesCopy);
};
