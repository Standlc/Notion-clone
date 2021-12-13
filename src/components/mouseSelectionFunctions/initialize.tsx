import { mouseSelector } from "../../mouseSelectionRect";

export const handleInitializingSelection = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  setEnableSelection: React.Dispatch<React.SetStateAction<boolean>>,
  setMouseSelection: React.Dispatch<React.SetStateAction<mouseSelector>>,
  setSelectedBlocks: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setEnableSelection(true);
  setMouseSelection({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    bottomOrigin: window.innerHeight - e.clientY,
    topOrigin: e.clientY,
    leftOrigin: e.clientX,
    rightOrigin: window.innerWidth - e.clientX,
  });
  setSelectedBlocks([]);
};
