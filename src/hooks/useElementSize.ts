import { useEventCallback } from "@mui/material";
import { MutableRefObject, useState } from "react";
import pick from "../utils/pick";
import useIsoLayoutEffect from "./useIsoLayoutEffect";

/**
 * Object representing an element's dimensions
 */
export interface ElementSize {
  /**
   * Measured element's inner height
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
   */
  clientHeight: number;
  /**
   * Measured element's inner width
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
   */
  clientWidth: number;
  /**
   * Measured element's outer height
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/offsetHeight
   */
  offsetHeight: number;
  /**
   * Measured element's outer width
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/offsetWidth
   */
  offsetWidth: number;
}

const defaultElementSize = {
  clientHeight: 0,
  clientWidth: 0,
  offsetHeight: 0,
  offsetWidth: 0,
};

/**
 * Automatically detect an elements' size
 *
 * This hook uses ResizeObserver to keep state
 * in sync with underlying DOM element
 */
export default function useElementSize<E extends HTMLElement>(
  ref: MutableRefObject<E | null>,
  onResize?: (element: E) => void
): ElementSize {
  const [size, setSize] = useState<ElementSize>(defaultElementSize);

  const handleResize = useEventCallback((element: E) => {
    const elementSize = pick(
      element,
      "clientHeight",
      "clientWidth",
      "offsetHeight",
      "offsetWidth"
    );
    setSize(elementSize);
    onResize?.(element);
  });

  useIsoLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      handleResize(entry.target as E);
    });
    observer.observe(ref.current, { box: "border-box" });
    handleResize(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [handleResize]);

  return size;
}
