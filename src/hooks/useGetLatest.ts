import { useCallback, useRef } from "react";

/**
 * Creates a getter function to return a stored object
 * @param obj
 * @returns
 */
export function useGetLatest<T>(obj: T) {
  const ref = useRef<T>(obj);

  return useCallback(() => ref.current, []);
}
