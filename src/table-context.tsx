import { createContext, useContext } from "react";
import type { TableInstance } from "react-table";
import type { BaseType } from "./types";

export const TableContext = createContext<TableInstance<any> | null>(null);
TableContext.displayName = "TableContext";

/**
 * Get current table instance from context
 */
export function useTableInstance<D extends BaseType = BaseType>() {
  const context = useContext<TableInstance<D> | null>(TableContext);

  if (!context) {
    throw new Error("TableContext was not provided.");
  }

  return context;
}
