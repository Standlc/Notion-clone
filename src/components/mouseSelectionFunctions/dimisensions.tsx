import { mouseSelector } from "../../mouseSelectionRect";

export const handleSelectionDimensions = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  enableSelection: boolean,
  mouseSelection: mouseSelector,
  selectionRectRef: React.MutableRefObject<HTMLDivElement | null>,
  setMouseSelection: React.Dispatch<React.SetStateAction<mouseSelector>>
) => {
  if (enableSelection && mouseSelection) {
    if (selectionRectRef.current) {
      selectionRectRef.current.style.visibility = "visible";
      if (window.innerHeight - mouseSelection.bottomOrigin - e.clientY > 0) {
        selectionRectRef.current.style.bottom =
          mouseSelection.bottomOrigin + "px";
        selectionRectRef.current.style.top = "auto";
      } else {
        selectionRectRef.current.style.top = mouseSelection.topOrigin + "px";
        selectionRectRef.current.style.bottom = "auto";
      }
      if (window.innerWidth - mouseSelection.rightOrigin - e.clientX > 0) {
        selectionRectRef.current.style.right =
          mouseSelection.rightOrigin + "px";
        selectionRectRef.current.style.left = "auto";
      } else {
        selectionRectRef.current.style.left = mouseSelection.leftOrigin + "px";
        selectionRectRef.current.style.right = "auto";
      }
    }
    const selectionHeight =
      window.innerHeight - mouseSelection.bottomOrigin - e.clientY > 0
        ? window.innerHeight - mouseSelection.bottomOrigin - e.clientY
        : e.clientY - mouseSelection.topOrigin;
    const selectionWidth =
      window.innerWidth - mouseSelection.rightOrigin - e.clientX > 0
        ? window.innerWidth - mouseSelection.rightOrigin - e.clientX
        : e.clientX - mouseSelection.leftOrigin;
    if (selectionRectRef.current) {
      selectionRectRef.current.style.height = selectionHeight + "px";
      selectionRectRef.current.style.width = selectionWidth + "px";
    }
    const top = selectionRectRef.current?.getBoundingClientRect().top;
    const left = selectionRectRef.current?.getBoundingClientRect().left;
    const height = selectionHeight;
    const width = selectionWidth;
    if (
      top !== undefined &&
      height !== undefined &&
      left !== undefined &&
      width !== undefined
    ) {
      setMouseSelection({
        ...mouseSelection,
        top,
        left,
        height,
        width,
      });
    }
  }
};
