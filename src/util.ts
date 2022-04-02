import { MutableRefObject } from "react";

export const isBrowser = typeof window !== "undefined";

export function ownerDocument(node: Node | null | undefined): Document {
  return (node && node.ownerDocument) || document;
}

type Ref<T> =
  | MutableRefObject<T | null>
  | ((instance: T | null) => void)
  | null
  | undefined;

/**
 * util to set a callback ref OR a mutable ref object
 * @param ref
 * @param value
 */
export function setRef<T>(ref: Ref<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
