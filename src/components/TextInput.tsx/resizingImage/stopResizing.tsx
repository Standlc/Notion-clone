import { resizedDistance } from "../../../resizedDistanceContext";

export const handleStopResizing = (
  resizedDistance: resizedDistance,
  setResizedDistance: React.Dispatch<React.SetStateAction<resizedDistance>>
) => {
  if (resizedDistance.initialPos !== 0) {
    setResizedDistance({ ...resizedDistance, initialPos: 0 });
  }
};
