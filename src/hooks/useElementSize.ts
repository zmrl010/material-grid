import { useEventCallback } from "@mui/material";
import { MutableRefObject, useState } from "react";
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

/**
 * Automatically detect an elements' size
 *
 * This hook uses ResizeObserver to keep state
 * in sync with underlying DOM element
 */
export default function useElementSize<E extends HTMLElement>(
  ref: MutableRefObject<E | null>,
  onResize?: (size: ElementSize) => void
): ElementSize {
  const [size, setSize] = useState<ElementSize>({
    clientHeight: 0,
    clientWidth: 0,
    offsetHeight: 0,
    offsetWidth: 0,
  });

  const handleResize = useEventCallback(() => {
    if (!ref.current) {
      return;
    }
    const elementSize = {
      clientHeight: ref.current.clientHeight,
      clientWidth: ref.current.clientWidth,
      offsetHeight: ref.current.offsetHeight,
      offsetWidth: ref.current.offsetWidth,
    };
    setSize(elementSize);
    onResize?.(elementSize);
  });

  useIsoLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver(() => handleResize());
    observer.observe(ref.current, { box: "border-box" });
    handleResize();

    return () => observer.disconnect();
  }, [handleResize]);

  return size;
}
