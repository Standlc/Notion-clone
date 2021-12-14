import { resizedDistance } from "../../../resizedDistanceContext";

export const handleResizing = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  resizedDistance: resizedDistance,
  setResizedDistance: React.Dispatch<React.SetStateAction<resizedDistance>>
) => {
  e.preventDefault();
  if (resizedDistance.initialPos > 0)
    setResizedDistance({
      ...resizedDistance,
      distance: resizedDistance.initialPos - e.pageX,
    });
};
