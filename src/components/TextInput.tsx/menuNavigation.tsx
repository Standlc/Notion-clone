import { NoteElement } from "../../App";
import { optionsData } from "../../data";

export const hanldeMenuNavigation = (
  e: React.KeyboardEvent<HTMLInputElement>,
  menuOptionIndex: number,
  setMenuOptionIndex: React.Dispatch<React.SetStateAction<number>>,
  note: NoteElement,
  setEnter: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    menuOptionIndex === 0
      ? setMenuOptionIndex(
          note.type !== "list"
            ? optionsData.types.length - 1
            : optionsData.listTypes.length - 1
        )
      : setMenuOptionIndex(menuOptionIndex - 1);
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    menuOptionIndex ===
    (note.type !== "list"
      ? optionsData.types.length - 1
      : optionsData.listTypes.length - 1)
      ? setMenuOptionIndex(0)
      : setMenuOptionIndex(menuOptionIndex + 1);
  } else if (e.key === "Enter") {
    e.preventDefault();
    setEnter(true);
  }
};
