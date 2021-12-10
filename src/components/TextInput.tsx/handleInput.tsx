import { NoteElement, NotesFile, SelectionProps } from "../../App";

export const handleInput = (
  e: React.FormEvent<HTMLDivElement>,
  lineRef: React.RefObject<HTMLDivElement>,
  note: NoteElement,
  currentNotes: NotesFile,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
  setFocusedNote: React.Dispatch<React.SetStateAction<NoteElement | undefined>>,
  setSelectionBoundings: React.Dispatch<
    React.SetStateAction<SelectionProps["selectionBoundings"]>
  >,
  setMenuOptionIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const nativeEvent = e.nativeEvent as InputEvent;

  if (lineRef && lineRef.current?.innerHTML !== undefined) {
    note.content = lineRef.current?.innerHTML;
    const notesCopy = { ...currentNotes };
    setCurrentNotes(notesCopy);
  }

  //OPEN MENU
  if (nativeEvent.data === "/") {
    setFocusedNote(note);
    setShowMenu(true);
    if (lineRef) {
      setSelectionBoundings({
        top: getSelection()?.getRangeAt(0).getBoundingClientRect().top,
        left: getSelection()?.getRangeAt(0).getBoundingClientRect().left,
      });
    }
  } else if (
    nativeEvent.data !== "/" &&
    nativeEvent.data !== "ArrowUp" &&
    nativeEvent.data !== "ArrowDown"
  ) {
    setShowMenu(false);
    setMenuOptionIndex(0);
  }
};
