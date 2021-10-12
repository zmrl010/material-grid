import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import { DragDropContextProps, DragDropContext } from "react-beautiful-dnd";
import { GridApiProvider, GridApiProviderProps } from "../api";
import { theme } from "../theme";
import { BaseType } from "../types";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <DragDropContext {...dragDropProps}>{children}</DragDropContext>
        </ThemeProvider>
      </StyledEngineProvider>
    </GridApiProvider>
  );
}

export default GridProvider;
