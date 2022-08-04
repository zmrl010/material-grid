import { useEventCallback } from "@mui/material";
import { MutableRefObject, useState } from "react";
import useIsoLayoutEffect from "./useIsoLayoutEffect";

interface ElementSize {
  /**
   * element clientHeight
   */
  clientHeight: number;
  /**
   * element clientWidth
   */
  clientWidth: number;
  /**
   * element offsetHeight
   */
  offsetHeight: number;
  /**
   * element offsetWidth
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
    setSize(ref.current);
    onResize?.(ref.current);
  });

  useIsoLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver(() => handleResize());

    observer.observe(ref.current, { box: "border-box" });

    return () => observer.disconnect();
  }, [handleResize]);

  return size;
}
