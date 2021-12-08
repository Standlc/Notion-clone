import { Context, createContext, useState } from "react";

export const SelectionRangeContext: Context<any> = createContext(null);
export type Range = {
  elementId: string;
  start: number;
  end: number;
};

export const RangeProvider = ({ children }: any) => {
  const [selectionRange, setSelectionRange] = useState({
    elementId: "",
    start: 0,
    end: 0,
  });

  return (
    <SelectionRangeContext.Provider
      value={{ selectionRange, setSelectionRange }}
    >
      {children}
    </SelectionRangeContext.Provider>
  );
};
