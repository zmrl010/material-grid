import { ownerDocument } from "@material-ui/core";
import { MutableRefObject, useCallback, useState } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

export function getScrollbarSize(doc: Document, element: HTMLElement): number {
  // create temp element
  const scrollDiv = doc.createElement("div");

  // apply temp element props
  scrollDiv.style.width = "99px";
  scrollDiv.style.height = "99px";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.overflow = "scroll";
  scrollDiv.className = "scrollDiv";

  // append temp element to passed element
  element.appendChild(scrollDiv);

  // get size
  const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // remove temp element
  element.removeChild(scrollDiv);

  return scrollbarSize;
}

/**
 * Hook to detect scrollbar size
 * Based on material ui datagrid utility
 * @param ref
 * @see https://github.com/mui-org/material-ui-x/blob/c992eb3de48ed3f465cb8d3daacd45f13758224a/packages/grid/_modules_/grid/hooks/utils/useGridScrollbarSizeDetector.tsx
 */
export function useScrollbarSizeDetector(
  ref: MutableRefObject<HTMLElement | null>
) {
  const [detectedScrollbarSize, setDetectedScrollbarSize] = useState(0);

  const detectScrollbarSize = useCallback(() => {
    let scrollbarSize = 0;

    if (ref.current) {
      const doc = ownerDocument(ref.current);
      scrollbarSize = getScrollbarSize(doc, ref.current);
    }
    if (detectedScrollbarSize !== scrollbarSize) {
      setDetectedScrollbarSize(scrollbarSize);
    }
  }, [detectedScrollbarSize]);

  useIsomorphicEffect(() => {
    detectScrollbarSize();
  });

  return detectedScrollbarSize;
}

export default useScrollbarSizeDetector;
