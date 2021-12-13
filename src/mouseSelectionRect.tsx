import { Context, createContext, useState } from "react";

export const MouseSelectionContext: Context<any> = createContext(null);
export type mouseSelector = {
  bottomOrigin: number;
  rightOrigin: number;
  topOrigin: number;
  leftOrigin: number;
  top: number;
  left: number;
  height: number;
  width: number;
};

export const MouseSelectionProvider = ({ children }: any) => {
  const [mouseSelection, setMouseSelection] = useState({
    bottomOrigin: 0,
    rightOrigin: 0,
    topOrigin: 0,
    leftOrigin: 0,
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });

  return (
    <MouseSelectionContext.Provider
      value={{ mouseSelection, setMouseSelection }}
    >
      {children}
    </MouseSelectionContext.Provider>
  );
};
