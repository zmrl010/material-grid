import { createContext, ReactNode, useContext } from "react";
import { TableInstance } from "react-table";
import type { BaseType } from "./types";

export const TableContext = createContext<TableInstance<any> | null>(null);
TableContext.displayName = "TableContext";

export interface TableProviderProps<D extends BaseType = BaseType> {
  instance: TableInstance<D>;
  children: ReactNode;
}

export function TableProvider<D extends BaseType = BaseType>({
  children,
  instance,
}: TableProviderProps<D>) {
  return (
    <TableContext.Provider value={instance}>{children}</TableContext.Provider>
  );
}

/**
 * Get current table instance from context
 */
export function useTableInstance<D extends BaseType = BaseType>() {
  const context = useContext<TableInstance<D> | null>(TableContext);

  if (!context) {
    throw new Error("useApi requires a parent GridApiProvider component.");
  }

  return context;
}
