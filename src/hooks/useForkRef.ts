import { Ref, useMemo } from "react";
import { setRef } from "../util";

/**
 * Return a function to set two passed refs
 */
export default function useForkRef<T>(
  refA: Ref<T> | null | undefined,
  refB: Ref<T> | null | undefined
) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }

    return (value: T) => {
      setRef(refA, value);
      setRef(refB, value);
    };
  }, [refA, refB]);
}
