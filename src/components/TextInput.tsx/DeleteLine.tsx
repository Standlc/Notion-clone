import { NoteElement, NotesFile } from "../../App";

export const handleDeleteLine = (
  e: React.KeyboardEvent<HTMLDivElement>,
  prevNodeRef: HTMLElement | null,
  lineRef: React.RefObject<HTMLDivElement>,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>,
  note: NoteElement,
  setSelectionRange: any
) => {
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const noteId = note.id;
  const lineIndex = currentNotes.notes.indexOf(note);
  const prevNode = currentNotes.notes[lineIndex - 1];
  const nextNode = currentNotes.notes[lineIndex + 1];

  if (lineIndex === 0 && lineRef.current?.textContent === "") {
    e.preventDefault();
  }
  if (
    lineIndex === 0 &&
    lineRef.current?.textContent === "" &&
    currentNotes.notes.length > 1 &&
    nextNode
  ) {
    e.preventDefault();
    setSelectionRange({
      elementId: nextNode.id,
      start: nextNode.content.length,
      end: nextNode.content.length,
    });
    currentNotes.notes = currentNotes.notes.filter(
      (note) => note.id !== noteId
    );
    const currentNotesCopy = { ...currentNotes };
    setCurrentNotes(currentNotesCopy);
  }
  if (currentNotes.notes.length > 1) {
    //EMPTY LINE
    if (lineRef.current?.innerHTML === "" && prevNode) {
      e.preventDefault();
      setSelectionRange({
        elementId: prevNode.id,
        start: prevNode.content.length,
        end: prevNode.content.length,
      });
      currentNotes.notes = currentNotes.notes.filter(
        (note) => note.id !== noteId
      );
    }
    //LINE WITH CONTENT
    if (lineRef.current?.innerHTML && caretPos === 0 && prevNode) {
      e.preventDefault();
      setSelectionRange({
        elementId: prevNode.id,
        start: prevNode.content.length,
        end: prevNode.content.length,
      });
      if (!prevNodeRef) return;
      prevNode.content += note.content;
      prevNodeRef.innerHTML = prevNode.content;
      currentNotes.notes = currentNotes.notes.filter(
        (note) => note.id !== noteId
      );
    }
    const currentNotesCopy = { ...currentNotes };
    setCurrentNotes(currentNotesCopy);
  }
};
