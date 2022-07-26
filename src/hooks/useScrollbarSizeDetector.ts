import { type MutableRefObject, useCallback, useState } from "react";
import useIsoLayoutEffect from "./useIsoLayoutEffect";

/**
 * Gets the vertical scrollbar width, returning
 * @param element element to check the scrollbar size
 * @returns scrollbar width in pixels, 0 if there is no vertical scrollbar
 */
function getScrollbarSize(element: HTMLElement): number {
  return element.offsetWidth - element.clientWidth;
}

/**
 * Detect scrollbar size by passing a valid element ref
 */
export default function useScrollbarSizeDetector(
  ref: MutableRefObject<HTMLElement | null>
) {
  const [detectedScrollbarSize, setDetectedScrollbarSize] = useState(0);

  const detectScrollbarSize = useCallback(() => {
    let scrollbarSize = 0;

    if (ref.current) {
      scrollbarSize = getScrollbarSize(ref.current);
    }
    if (detectedScrollbarSize !== scrollbarSize) {
      setDetectedScrollbarSize(scrollbarSize);
    }
  }, [detectedScrollbarSize, ref]);

  useIsoLayoutEffect(() => detectScrollbarSize());

  return detectedScrollbarSize;
}
