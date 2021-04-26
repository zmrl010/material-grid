import { DragDropContextProps, DragDropContext } from "react-beautiful-dnd";
import { GridApiProvider, GridApiProviderProps } from "../api";
import { BaseType } from "../types";

export type GridProviderProps<
  D extends BaseType = {}
> = GridApiProviderProps<D> & DragDropContextProps;

type Props<D extends BaseType = {}> = GridProviderProps<D>;

/**
 * Table component that wraps all table providers to a single provider
 * @param props
 * @returns
 */
export function GridProvider<D extends BaseType = {}>(props: Props<D>) {
  const {
    children,
    instance,
    components,
    // rowDragDropDisabled,
    ...dragDropProps
  } = props;

  return (
    <GridApiProvider
      instance={instance}
      components={components}
      // rowDragDropDisabled={rowDragDropDisabled}
    >
      <DragDropContext {...dragDropProps}>{children}</DragDropContext>
    </GridApiProvider>
  );
}

export default GridProvider;
