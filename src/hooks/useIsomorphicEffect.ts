import { useEffect, useLayoutEffect } from "react";

const isBrowser = typeof window !== "undefined";

/**
 * `useLayoutEffect` that falls back to `useEffect` when used on the server.
 */
const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;
