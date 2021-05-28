import { useEffect, useLayoutEffect } from "react";
import { isBrowser } from "../util";

export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;
