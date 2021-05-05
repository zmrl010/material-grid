import { useCallback, useState } from "react";

export function useBoundingRect(): [
  rect: DOMRect | undefined,
  ref: (element: HTMLElement | null) => void
] {
  const [boundingRect, setBoundingRect] = useState<DOMRect>();
  const measureRef = useCallback((element: HTMLElement | null) => {
    setBoundingRect(element?.getBoundingClientRect());
  }, []);

  return [boundingRect, measureRef];
}

export default useBoundingRect;
