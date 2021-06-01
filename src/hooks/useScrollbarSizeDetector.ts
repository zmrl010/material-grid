import { MutableRefObject, useCallback, useState } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

/**
 * Gets the vertical scrollbar width, returning
 * @param element element to check the scrollbar size
 * @returns scrollbar width in pixels, 0 if there is no vertical scrollbar
 */
export function getScrollbarSize(element: HTMLElement): number {
  return element.offsetWidth - element.clientWidth;
}

/**
 * Hook to detect scrollbar size
 * Based on material ui datagrid utility
 * @see https://github.com/mui-org/material-ui-x/blob/c992eb3de48ed3f465cb8d3daacd45f13758224a/packages/grid/_modules_/grid/hooks/utils/useGridScrollbarSizeDetector.tsx
 * @param ref
 */
export function useScrollbarSizeDetector(
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
  }, [detectedScrollbarSize]);

  useIsomorphicEffect(() => {
    detectScrollbarSize();
  });

  return detectedScrollbarSize;
}

export default useScrollbarSizeDetector;
