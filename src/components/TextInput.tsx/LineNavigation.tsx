import { NoteElement, NotesFile } from "../../App";

export const handleLineNavigation = (
  e: React.KeyboardEvent<HTMLDivElement>,
  setSelectionRange: any,
  note: NoteElement,
  currentNotes: NotesFile
) => {
  e.preventDefault();
  const lineIndex = currentNotes.notes.indexOf(note);
  const prevNode = currentNotes.notes[lineIndex - 1];
  const nextNode = currentNotes.notes[lineIndex + 1];
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  if (caretPos === undefined) return;
  //UP
  if (e.key === "ArrowUp" && prevNode) {
    if (prevNode.listItems !== undefined && prevNode.listItems?.length > 0) {
      const lastChild = prevNode.listItems[prevNode.listItems.length - 1];
      caretPos > lastChild.content.length
        ? setSelectionRange({
            elementId: lastChild.id,
            start: lastChild.content.length,
            end: lastChild.content.length,
          })
        : setSelectionRange({
            elementId: lastChild.id,
            start: caretPos,
            end: caretPos,
          });
    } else if (prevNode?.content.length < caretPos && prevNode) {
      setSelectionRange({
        elementId: prevNode.id,
        start: prevNode.content.length,
        end: prevNode.content.length,
      });
    } else if (prevNode) {
      setSelectionRange({
        elementId: prevNode.id,
        start: caretPos,
        end: caretPos,
      });
    }
  }
  //DOWN
  if (e.key === "ArrowDown") {
    //GO TO FIRST ITEM OF LIST
    if (note.listItems !== undefined && note.listItems.length > 0) {
      const listFirstItem = note.listItems[0];
      if (listFirstItem?.content.length < caretPos && listFirstItem) {
        setSelectionRange({
          elementId: listFirstItem.id,
          start: listFirstItem.content.length,
          end: listFirstItem.content.length,
        });
      } else if (listFirstItem) {
        setSelectionRange({
          elementId: listFirstItem.id,
          start: caretPos,
          end: caretPos,
        });
      }
    } else {
      if (nextNode?.content.length < caretPos && nextNode) {
        setSelectionRange({
          elementId: nextNode.id,
          start: nextNode.content.length,
          end: nextNode.content.length,
        });
      } else if (nextNode) {
        setSelectionRange({
          elementId: nextNode.id,
          start: caretPos,
          end: caretPos,
        });
      }
    }
  }
};
