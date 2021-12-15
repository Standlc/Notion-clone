import { NoteElement, NotesFile } from "../../App";

export const handleStoreImage = (
  e: React.ChangeEvent<HTMLInputElement>,
  line: NoteElement,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>
) => {
  const files = e.target.files;
  const lineID = line.id;
  if (files && files[0]) {
    const currentNotesCopy = { ...currentNotes };
    const lineCopy = currentNotes.notes.find((line) => line.id === lineID);
    if (lineCopy) {
      lineCopy.img = URL.createObjectURL(files[0]);
    }
    setCurrentNotes(currentNotesCopy);
  }
};
