import { DragDropContextProps, DragDropContext } from "react-beautiful-dnd";
import { TableProvider, TableProviderProps } from "../table-context";
import { BaseType } from "../types";

export type GridProviderProps<D extends BaseType = {}> = TableProviderProps<D> &
  DragDropContextProps;

/**
 * Table component that wraps all table providers to a single provider
 * @param props
 * @returns
 */
export function GridProvider<D extends BaseType = BaseType>({
  children,
  instance,
  ...dragDropProps
}: GridProviderProps<D>) {
  return (
    <TableProvider instance={instance}>
      <DragDropContext {...dragDropProps}>{children}</DragDropContext>
    </TableProvider>
  );
}

export default GridProvider;
