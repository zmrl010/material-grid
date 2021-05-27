import { ReactNode } from "react";
import { GridApiContext } from "./GridApiContext";
import { useCreateApiRef } from "./hooks";
import type { BaseType } from "../types";
import type { GridApiOptions } from "./types";

export interface GridApiProviderProps<D extends BaseType = BaseType>
  extends GridApiOptions<D> {
  children: ReactNode;
}

export function GridApiProvider<D extends BaseType = BaseType>(
  props: GridApiProviderProps<D>
) {
  const { children, ...apiProps } = props;
  const apiRef = useCreateApiRef<D>(apiProps);

  return (
    <GridApiContext.Provider value={apiRef}>{children}</GridApiContext.Provider>
  );
}

export default GridApiProvider;
