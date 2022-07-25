import type { RowData, Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";

const GridApiContext = createContext<Table<unknown> | null>(null);
GridApiContext.displayName = "GridApiContext";

export function useGridApi<TData extends RowData>() {
  return useContext(GridApiContext) as Table<TData>;
}
