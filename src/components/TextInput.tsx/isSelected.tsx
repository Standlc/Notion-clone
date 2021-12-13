import { mouseSelector } from "../../mouseSelectionRect";

export const handleIsSelected = (
  lineID: string,
  wrapperRef: React.RefObject<HTMLDivElement>,
  mouseSelection: mouseSelector,
  selectedBlocks: string[],
  setSelectedBlocks: React.Dispatch<React.SetStateAction<string[]>>,
  setIsMouseSelected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const top = wrapperRef.current?.getBoundingClientRect().top;
  const height = wrapperRef.current?.getBoundingClientRect().height;
  const left = wrapperRef.current?.getBoundingClientRect().left;
  const width = wrapperRef.current?.getBoundingClientRect().width;
  if (
    top === undefined ||
    left === undefined ||
    height === undefined ||
    width === undefined
  )
    return;
  if (
    ((top > mouseSelection.top &&
      top < mouseSelection.top + mouseSelection.height) ||
      (top + height > mouseSelection.top &&
        top + height < mouseSelection.top + mouseSelection.height) ||
      (top < mouseSelection.top &&
        top + height > mouseSelection.top + mouseSelection.height)) &&
    ((left < mouseSelection.left + mouseSelection.width &&
      left > mouseSelection.left) ||
      (left + width > mouseSelection.left &&
        left + width < mouseSelection.left + mouseSelection.width) ||
      (left < mouseSelection.left &&
        left + width > mouseSelection.left + mouseSelection.width))
  ) {
    setIsMouseSelected(true);
    if (!selectedBlocks.find((id) => id === lineID)) {
      setSelectedBlocks([...selectedBlocks, lineID]);
    }
  } else {
    setIsMouseSelected(false);
    setSelectedBlocks(selectedBlocks.filter((id) => id === lineID));
  }
};
