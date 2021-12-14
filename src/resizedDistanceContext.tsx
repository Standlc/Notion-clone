import { Context, createContext, useState } from "react";

export const ResizedDistanceContext: Context<any> = createContext(null);
export type resizedDistance = {
  initialPos: number;
  distance: number;
};

export const ResizedDistanceProvider = ({ children }: any) => {
  const [resizedDistance, setResizedDistance] = useState({
    initialPos: 0,
    distance: 0,
  });

  return (
    <ResizedDistanceContext.Provider
      value={{ setResizedDistance, resizedDistance }}
    >
      {children}
    </ResizedDistanceContext.Provider>
  );
};
