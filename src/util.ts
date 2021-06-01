import { MutableRefObject } from "react";

/**
 * basic function that does nothing
 */
export function noop() {}

export const isBrowser = typeof window !== "undefined";

export function ownerDocument(node: Node | null | undefined): Document {
  return (node && node.ownerDocument) || document;
}

/**
 * util to set a callback ref OR a mutable ref object
 * @param ref
 * @param value
 */
export function setRef<T>(
  ref:
    | MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null
) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
