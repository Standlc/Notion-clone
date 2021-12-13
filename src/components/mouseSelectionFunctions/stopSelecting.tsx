export const handleStopSelecting = (
  selectionRectRef: React.MutableRefObject<HTMLDivElement | null>,
  setEnableSelection: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (selectionRectRef.current) {
    selectionRectRef.current.style.visibility = "hidden";
    selectionRectRef.current.style.height = "0px";
    selectionRectRef.current.style.width = "0px";
  }
  setEnableSelection(false);
};
