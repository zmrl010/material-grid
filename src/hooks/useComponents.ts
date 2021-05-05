import { useMemo } from "react";
import { DEFAULT_COMPONENTS } from "../components";
import { GridComponents } from "../types";

export function useComponents(propComponents: Partial<GridComponents> = {}) {
  const components = useMemo(
    () => ({
      ...DEFAULT_COMPONENTS,
      ...propComponents,
    }),
    [propComponents]
  );

  return components;
}

export default useComponents;
