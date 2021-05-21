import { DragDropContextProps, DragDropContext } from "react-beautiful-dnd";
import { GridApiProvider, GridApiProviderProps } from "../api";
import { BaseType } from "../types";
import { GridThemeProvider } from "./GridThemeProvider";

export type GridProviderProps<
  D extends BaseType = {}
> = GridApiProviderProps<D> & DragDropContextProps;

type Props<D extends BaseType = BaseType> = GridProviderProps<D>;

/**
 * Table component that wraps all table providers to a single provider
 * @param props
 * @returns
 */
export function GridProvider<D extends BaseType = BaseType>(props: Props<D>) {
  const { children, instance, components, ...dragDropProps } = props;

  return (
    <GridApiProvider instance={instance} components={components}>
      <GridThemeProvider>
        <DragDropContext {...dragDropProps}>{children}</DragDropContext>
      </GridThemeProvider>
    </GridApiProvider>
  );
}

export default GridProvider;
