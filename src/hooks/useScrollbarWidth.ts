import { useEventCallback } from "@mui/material";
import { type MutableRefObject, useState } from "react";
import useIsoLayoutEffect from "./useIsoLayoutEffect";

/**
 * Gets the vertical scrollbar width, returning
 * @param element element to check the scrollbar size
 * @returns scrollbar width in pixels, 0 if there is no vertical scrollbar
 */
function getScrollbarWidth(element: HTMLElement): number {
  return element.offsetWidth - element.clientWidth;
}

/**
 * Measure an elements' scrollbar width
 */
export default function useScrollbarWidth<E extends HTMLElement>(
  ref: MutableRefObject<E | null>
) {
  const [width, setWidth] = useState(0);

  const handleResize = useEventCallback(() => {
    if (!ref.current) {
      return;
    }

    const detectedWidth = getScrollbarWidth(ref.current);

    if (width !== detectedWidth) {
      setWidth(detectedWidth);
    }
  });

  useIsoLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(() => handleResize);
    observer.observe(ref.current, { box: "border-box" });
    handleResize();

    return () => observer.disconnect();
  }, [handleResize]);

  return width;
}
