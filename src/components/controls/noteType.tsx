import { NoteElement, NotesFile } from "../../App";
import { v4 } from "uuid";

export const handleNoteType = (
  type: string,
  focusedNote: NoteElement | undefined,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>,
  setMenuOptionIndex: React.Dispatch<React.SetStateAction<number>>,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectionRange: any
) => {
  if (focusedNote === undefined) return;
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const lineIndex = currentNotes.notes.indexOf(focusedNote);
  const newLineId = v4();
  if (caretPos === undefined) return;

  //DIVIDER
  if (type === "divider") {
    if (focusedNote?.content === "/") {
      focusedNote.type = type;
      currentNotes.notes.splice(lineIndex + 1, 0, {
        type: "newNote",
        content: "",
        id: newLineId,
      });
      setSelectionRange({
        elementId: newLineId,
        start: 0,
        end: 0,
      });
    } else {
      currentNotes.notes.splice(lineIndex + 1, 0, {
        type: "divider",
        content: "",
        id: v4(),
      });
      setSelectionRange({
        elementId: focusedNote.id,
        start: caretPos - 1,
        end: caretPos - 1,
      });
    }
  } else if (focusedNote) {
    setSelectionRange({
      elementId: focusedNote.id,
      start: caretPos - 1,
      end: caretPos - 1,
    });
    focusedNote.listItems?.map((listItem) => (listItem.checked = false));
    if (type === "list") {
      if (focusedNote) {
        focusedNote.listItems = [];
        focusedNote.listType = "bullets";
      }
    }
    if (type === "image") {
      if (focusedNote) {
        focusedNote.img = "";
      }
    }
    if (focusedNote) {
      focusedNote.type = type;
    }
  }
  focusedNote.content =
    focusedNote.content.slice(0, caretPos - 1) +
    focusedNote.content.slice(caretPos, focusedNote.content.length);
  const currentLine = document.getElementById(focusedNote.id);
  if (currentLine) currentLine.childNodes[0].textContent = focusedNote.content;
  const currentNotesCopy = { ...currentNotes };
  setCurrentNotes(currentNotesCopy);
  setMenuOptionIndex(0);
  setShowMenu(false);
};
