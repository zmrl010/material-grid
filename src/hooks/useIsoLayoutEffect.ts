import { useEffect, useLayoutEffect } from "react";

const isBrowser = typeof window !== "undefined";

/**
 * `useLayoutEffect` that falls back to `useEffect` when used on the server.
 */
const useIsoLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsoLayoutEffect;
