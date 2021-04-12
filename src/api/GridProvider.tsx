import { ReactNode } from "react";
import { GridContext } from "./GridContext";
import { useApi } from "./useApi";

export interface DataTableProviderProps {
  children: ReactNode;
}

export default function DataTableProvider(props: DataTableProviderProps) {
  const apiRef = useApi();

  return (
    <GridContext.Provider value={apiRef}>{props.children}</GridContext.Provider>
  );
}
