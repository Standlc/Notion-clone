export const handleLineNavigation = (
  e: React.KeyboardEvent<HTMLInputElement>,
  elRef: HTMLElement | null,
  lineRef: React.RefObject<HTMLDivElement>,
  setSelectionRange: any
) => {

  e.preventDefault();
  const caretPos = getSelection()?.getRangeAt(0).endOffset;
  const range = getSelection()?.getRangeAt(0);
  if (caretPos === undefined) return;
  const childNode = elRef?.childNodes[0];
  if (elRef?.textContent === null || range === undefined || !childNode) return;
  if (elRef?.textContent.length < caretPos) {
    range.setStart(childNode, elRef?.textContent.length);
  } else {
    range.setStart(childNode, caretPos);
  }
  range.collapse(true);
  getSelection()?.removeAllRanges();
  getSelection()?.addRange(range);
};
