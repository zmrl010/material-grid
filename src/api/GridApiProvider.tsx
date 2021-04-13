import { ReactNode } from "react";
import { GridApiContext } from "./GridApiContext";
import { useApiRef } from "./hooks";
import type { GridApi } from "./types";
import { BaseType } from "../types";

export interface GridApiProviderProps<D extends BaseType = {}>
  extends GridApi<D> {
  children: ReactNode;
}

export function GridApiProvider<D extends BaseType = {}>(
  props: GridApiProviderProps<D>
) {
  const { children, ...apiProps } = props;
  const apiRef = useApiRef<D>(apiProps);

  return (
    <GridApiContext.Provider value={apiRef}>{children}</GridApiContext.Provider>
  );
}

export default GridApiProvider;
