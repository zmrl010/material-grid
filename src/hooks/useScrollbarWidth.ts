import { type MutableRefObject } from "react";
import useElementSize from "./useElementSize";

/**
 * Gets the vertical scrollbar width, returning
 * @param element partial element containing offset and client widths
 * @returns scrollbar width in pixels, 0 if there is no vertical scrollbar
 */
function getScrollbarWidth(
  element: Pick<HTMLElement, "offsetWidth" | "clientWidth">
): number {
  return element.offsetWidth - element.clientWidth;
}

/**
 * Measure an elements' scrollbar width
 */
export default function useScrollbarWidth<E extends HTMLElement>(
  ref: MutableRefObject<E | null>
) {
  const size = useElementSize(ref);
  return getScrollbarWidth(size);
}
