import styled from "styled-components";
import { NoteElement, List, NotesFile } from "../../../App";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import { SelectionRangeContext } from "../../../selectionRange";
import { handleItemNavigation } from "./lineNavigation/itemNavigation";
import { handleOutsideListNavigation } from "./lineNavigation/outsideListNavigation";
import { handleEnterListItem } from "./enterListItem";
import { handleDeleteListItem } from "./deleteListItem";
import { handleListItemInput } from "./listItemInpu";

interface Props {
  item: List;
  listParent: NoteElement;
  currentNotes: NotesFile;
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesFile>>;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  width: calc(100% - 60px);
`;
const Dot = styled.div`
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
`;
const InputLine = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 15px;
  margin-left: 10px;
  border-radius: 5px;
  color: white;
  font-weight: 300;
  background-color: transparent;
  transition: background-color 100ms;
  width: 100%;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;

const ListComponent: React.FC<Props> = ({
  item,
  listParent,
  currentNotes,
  setCurrentNotes,
}) => {
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext
  );
  const listItemRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const itemIndex = listParent.listItems?.indexOf(item);

  useLayoutEffect(() => {
    const range = new Range();
    if (selectionRange.elementId !== item.id) {
      return;
    }
    const childNode = listItemRef.current?.childNodes[0];
    if (childNode === undefined) return;
    range.setStart(childNode, selectionRange.start);
    range.setEnd(childNode, selectionRange.end);
    getSelection()?.removeAllRanges();
    getSelection()?.addRange(range);
  }, [selectionRange, item.id]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //ENTER NEW LIST ITEM
    if (e.key === "Enter") {
      handleEnterListItem(
        e,
        item,
        listItemRef,
        listParent,
        setSelectionRange,
        currentNotes,
        setCurrentNotes
      );
    }
    //DELETE LIST ITEM
    if (e.key === "Backspace") {
      handleDeleteListItem(
        e,
        item,
        listParent,
        setSelectionRange,
        currentNotes,
        setCurrentNotes
      );
    }
    //LINE NAVIGATION
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const itemIndex = listParent.listItems?.indexOf(item);
      if (listParent.listItems?.length === undefined) return;
      if (
        (itemIndex === listParent.listItems?.length - 1 &&
          e.key === "ArrowDown") ||
        (itemIndex === 0 && e.key === "ArrowUp")
      ) {
        handleOutsideListNavigation(
          e,
          item,
          listParent,
          currentNotes,
          setSelectionRange
        );
        return;
      }
      handleItemNavigation(e, item, listParent, setSelectionRange);
    }
  };
  const handleCheckbox = (type: boolean) => {
    item.checked = type;
    const notesCopy = { ...currentNotes };
    setCurrentNotes(notesCopy);
  };
  const handeInput = (e: React.FormEvent<HTMLDivElement>) => {
    handleListItemInput(item, listItemRef, currentNotes, setCurrentNotes);
  };

  const handleClick = () => {
    const caretPos = getSelection()?.getRangeAt(0).endOffset;
    setSelectionRange({
      elementId: item.id,
      start: caretPos,
      end: caretPos,
    });
  };

  return (
    <Wrapper>
      {listParent.listType === "bullets" && <Dot />}
      {listParent.listType === "numbered" && (
        <span style={{ width: "20px", textAlign: "end", fontSize:'15px' }}>
          {itemIndex ? itemIndex + 1 : 1} .
        </span>
      )}
      {listParent.listType === "checkbox" &&
        (item.checked ? (
          <RadioButtonChecked
            onClick={() => handleCheckbox(false)}
            style={{ fontSize: "medium", color: "white", cursor: "pointer" }}
          />
        ) : (
          <RadioButtonUnchecked
            onClick={() => handleCheckbox(true)}
            style={{ fontSize: "medium", color: "white", cursor: "pointer" }}
          />
        ))}
      <InputLine
        onClick={handleClick}
        id={item.id}
        contentEditable="true"
        suppressContentEditableWarning={true}
        ref={listItemRef}
        onInput={handeInput}
        onKeyDown={handleKeyDown}
        spellCheck="false"
      >
        <Text value={item.content} />
      </InputLine>
    </Wrapper>
  );
};

export default ListComponent;

const Text = React.memo(
  ({ value }: { value: string }) => {
    return <>{value}</>;
  },
  (prevProps, props) => !!props.value
);
