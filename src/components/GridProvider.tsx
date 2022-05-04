import { DragDropContextProps, DragDropContext } from "react-beautiful-dnd";
import { TableContext, type TableProviderProps } from "../table-context";
import type { BaseType } from "../types";

export type GridProviderProps<D extends BaseType = BaseType> =
  TableProviderProps<D> & DragDropContextProps;

/**
 * Table component that wraps all table providers to a single provider
 */
export function GridProvider<D extends BaseType = BaseType>({
  children,
  instance,
  ...dragDropProps
}: GridProviderProps<D>) {
  return (
    <TableContext.Provider value={instance}>
      <DragDropContext {...dragDropProps}>{children}</DragDropContext>
    </TableContext.Provider>
  );
}

export default GridProvider;
