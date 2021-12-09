import { List, NoteElement, NotesFile } from "../../../../App";

export const handleOutsideListNavigation = (
  e: React.KeyboardEvent<HTMLDivElement>,
  listItem: List,
  listParent: NoteElement,
  currentNotes: NotesFile,
  setSelectionRange: any
) => {
  const listItemIndex = listParent.listItems?.indexOf(listItem);
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  e.preventDefault();
  if (caretPos === undefined) return;
  //FIRST CHILD
  if (listItemIndex === 0 && e.key === "ArrowUp") {
    if (caretPos > listParent.content.length) {
      setSelectionRange({
        elementId: listParent.id,
        start: listParent.content.length,
        end: listParent.content.length,
      });
    } else {
      setSelectionRange({
        elementId: listParent.id,
        start: caretPos,
        end: caretPos,
      });
    }
  }
  //LAST CHILD
  if (listParent.listItems?.length === undefined) return;
  if (
    listItemIndex === listParent.listItems?.length - 1 &&
    e.key === "ArrowDown"
  ) {
    const listParentIndex = currentNotes.notes.indexOf(listParent);
    const nextLineNode = currentNotes.notes[listParentIndex + 1];
    if (!nextLineNode) return;
    if (caretPos > nextLineNode.content.length) {
      setSelectionRange({
        elementId: nextLineNode.id,
        start: nextLineNode.content.length,
        end: nextLineNode.content.length,
      });
    } else {
      setSelectionRange({
        elementId: nextLineNode.id,
        start: caretPos,
        end: caretPos,
      });
    }
  }
};
