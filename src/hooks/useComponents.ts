import { useMemo } from "react";
import merge from "lodash/merge";
import { DEFAULT_COMPONENTS } from "../components";
import { GridComponents } from "../types";

/**
 * Merge set of components with the default set
 * @param propComponents
 * @returns
 */
export function useComponents(propComponents: Partial<GridComponents> = {}) {
  const components = useMemo(() => merge(DEFAULT_COMPONENTS, propComponents), [
    propComponents,
  ]);

  return components;
}

export default useComponents;
