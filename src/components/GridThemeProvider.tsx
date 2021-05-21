import { ThemeProvider, useTheme } from "@material-ui/core";
import { merge } from "lodash";
import { ReactNode, useMemo } from "react";
import { theme } from "../theme";

export interface GridThemeProviderProps {
  children: ReactNode;
}

type Props = GridThemeProviderProps;

/**
 * Theme provider that merges an outer provided theme if applicable
 * @param props
 * @returns
 */
export function GridThemeProvider(props: Props) {
  const { children } = props;

  // outerTheme provided by hosting application
  const outerTheme = useTheme();
  const innerTheme = useMemo(() => merge(theme, outerTheme), [outerTheme]);

  return <ThemeProvider theme={innerTheme}>{children}</ThemeProvider>;
}

export default GridThemeProvider;
