import { List, NoteElement, NotesFile } from "../../../../App";

export const handleItemNavigation = (
  e: React.KeyboardEvent<HTMLDivElement>,
  listItem: List,
  listParent: NoteElement,
  setSelectionRange: any
) => {
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const itemIndex = listParent.listItems?.indexOf(listItem);
  e.preventDefault();
  if (
    caretPos === undefined ||
    itemIndex === undefined ||
    !listParent.listItems
  )
    return;
  //UP
  if (e.key === "ArrowUp") {
    const prevListItem = listParent.listItems[itemIndex - 1];
    if (prevListItem?.content.length === undefined) return;
    if (caretPos > prevListItem.content.length) {
      setSelectionRange({
        elementId: prevListItem?.id,
        start: prevListItem?.content.length,
        end: prevListItem?.content.length,
      });
    } else {
      setSelectionRange({
        elementId: prevListItem?.id,
        start: caretPos,
        end: caretPos,
      });
    }
  }
  //DOWN
  if (e.key === "ArrowDown") {
    const nextListItem = listParent.listItems[itemIndex + 1];
    if (nextListItem?.content.length === undefined) return;
    if (caretPos > nextListItem?.content.length) {
      setSelectionRange({
        elementId: nextListItem?.id,
        start: nextListItem?.content.length,
        end: nextListItem?.content.length,
      });
    } else {
      setSelectionRange({
        elementId: nextListItem?.id,
        start: caretPos,
        end: caretPos,
      });
    }
  }
};
