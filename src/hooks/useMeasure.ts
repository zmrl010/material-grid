import { useCallback, useState } from "react";
import useResizeObserver from "./useResizeObserver";

export type Rect = Omit<DOMRect, "toJSON">;

const defaultRect: Rect = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: 0,
  width: 0,
};

/**
 * Get rectangular measurements of an HTMLElement
 * @returns
 * * ref to pass to element to observe
 * * state of that element rect
 */
export default function useElementRect<E extends Element = Element>() {
  const [element, ref] = useState<E | null>(null);
  const [rect, setRect] = useState<Rect>(defaultRect);

  const measureNode = useCallback(([entry]: ResizeObserverEntry[]) => {
    if (entry) {
      setRect(entry.contentRect);
    }
  }, []);

  useResizeObserver(element, measureNode);

  return [ref, rect];
}
