import { useMemo } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

/**
 * Hook to observe the change in DOM node rect measurements
 * @param element - DOM element to observe
 * @param callback - observer callback called when element resizes *Should to be memoized*
 */
export default function useResizeObserver<E extends Element = Element>(
  element: E | null,
  callback: ResizeObserverCallback
) {
  const observer = useMemo(() => new ResizeObserver(callback), [callback]);

  useIsomorphicEffect(() => {
    if (!element) {
      return;
    }
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);
}
