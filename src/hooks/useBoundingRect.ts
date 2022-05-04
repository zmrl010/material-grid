import { useCallback, useState } from "react";

export default function useBoundingRect(): [
  rect: DOMRect | undefined,
  ref: (element: HTMLElement | null) => void
] {
  const [boundingRect, setBoundingRect] = useState<DOMRect>();
  const measureRef = useCallback((element: HTMLElement | null) => {
    setBoundingRect(element?.getBoundingClientRect());
  }, []);

  return [boundingRect, measureRef];
}
