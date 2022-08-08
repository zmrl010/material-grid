import { type MutableRefObject } from "react";
import useElementSize from "./useElementSize";

/**
 * Measure an elements' scrollbar width
 * @returns scrollbar width in pixels, 0 if there is no vertical scrollbar
 */
export default function useScrollbarWidth<E extends HTMLElement>(
  ref: MutableRefObject<E | null>
) {
  const size = useElementSize(ref);
  return size.offsetWidth - size.clientWidth;
}
