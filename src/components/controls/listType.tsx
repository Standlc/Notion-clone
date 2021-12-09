import { NoteElement, NotesFile } from "../../App";

export const handleListType = (
  type: string,
  focusedNote: NoteElement | undefined,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>,
  setMenuOptionIndex: React.Dispatch<React.SetStateAction<number>>,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectionRange: any
) => {
  if (focusedNote) {
    focusedNote.listType = type;
    const caretPos = getSelection()?.getRangeAt(0).endOffset;
    if (caretPos === undefined) return;
    const currentLine = document.getElementById(focusedNote.id);
    focusedNote.content =
      focusedNote.content.slice(0, caretPos - 1) +
      focusedNote.content.slice(caretPos, focusedNote.content.length);
    if (currentLine)
      currentLine.childNodes[0].textContent = focusedNote.content;
    setSelectionRange({
      elementId: focusedNote.id,
      start: caretPos - 1,
      end: caretPos - 1,
    });
    focusedNote.listItems?.map((listItem) => (listItem.checked = false));
    const currentNotesCopy = { ...currentNotes };
    setCurrentNotes(currentNotesCopy);
  }
  setShowMenu(false);
  setMenuOptionIndex(0);
};
