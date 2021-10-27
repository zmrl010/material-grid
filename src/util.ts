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

/**
 * Pass multiple refs and return a setter function
 * that accepts a single value and sets all the refs that were passed to it
 */
export function createRefSetter<T>(...refs: Ref<T>[]) {
  return (value: T | null) => {
    for (let ref of refs) {
      setRef(ref, value);
    }
  };
}
