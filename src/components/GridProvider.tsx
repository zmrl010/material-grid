import { ThemeProvider, useTheme } from "@material-ui/core";
import { useMemo } from "react";
import { DragDropContextProps, DragDropContext } from "react-beautiful-dnd";
import { GridApiProvider, GridApiProviderProps } from "../api";
import { theme } from "../theme";
import { BaseType } from "../types";

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

  const outerTheme = useTheme() || {};
  const innerTheme = useMemo(() => ({ ...theme, ...outerTheme }), [outerTheme]);

  return (
    <GridApiProvider instance={instance} components={components}>
      <ThemeProvider theme={innerTheme}>
        <DragDropContext {...dragDropProps}>{children}</DragDropContext>
      </ThemeProvider>
    </GridApiProvider>
  );
}

export default GridProvider;
