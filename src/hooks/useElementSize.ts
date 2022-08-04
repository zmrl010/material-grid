import { useEventCallback } from "@mui/material";
import { useRef, useState } from "react";
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
export default function useElementSize(
  onResize?: (size: ElementSize) => void
): ElementSize {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<ElementSize>({
    clientHeight: 0,
    clientWidth: 0,
    offsetHeight: 0,
    offsetWidth: 0,
  });

  const handleResize = useEventCallback(() => {
    if (!bodyRef.current) {
      return;
    }
    setSize(bodyRef.current);
    onResize?.(bodyRef.current);
  });

  useIsoLayoutEffect(() => {
    if (!bodyRef.current) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      handleResize();
      entries.forEach((entry) => {
        entry.borderBoxSize;
      });
    });

    observer.observe(bodyRef.current, { box: "border-box" });

    return () => observer.disconnect();
  }, [handleResize]);

  return size;
}
