import { useMemo } from "react";
import { GridComponents, DEFAULT_COMPONENTS } from "./components";

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
