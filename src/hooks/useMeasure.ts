import { useCallback, useState } from "react";
import { useResizeObserver } from "./useResizeObserver";

export interface MeasureRect {
  x: number;
  y: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  height: number;
  width: number;
}

/**
 * simple helper to get only MeasureRect props from DOMRect object
 */
function getMeasureRect(rect: DOMRect): MeasureRect {
  const { x, y, width, height, top, left, bottom, right } = rect;

  return {
    x,
    y,
    width,
    height,
    top,
    left,
    bottom,
    right,
  };
}

const defaultMeasureData = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: 0,
  width: 0,
};

export type UseMeasureRef<E extends Element = Element> = (element: E) => void;
export type UseMeasureResults<E extends Element = Element> = [
  UseMeasureRef<E>,
  UseMeasureResults
];

export function useMeasure<E extends Element = Element>() {
  const [element, ref] = useState<E | null>(null);
  const [rect, setRect] = useState<MeasureRect>(defaultMeasureData);

  const measureNode = useCallback(([entry]: ResizeObserverEntry[]) => {
    if (entry) {
      const rect = getMeasureRect(entry.contentRect);
      setRect(rect);
    }
  }, []);

  useResizeObserver(element, measureNode);

  return [ref, rect];
}
