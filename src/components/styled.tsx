import { StyledComponent } from "@emotion/styled";
import {
  alpha,
  darken,
  lighten,
  styled,
  TableBody,
  TableCell,
  tableCellClasses,
  TableFooter,
  TableRow,
  type TableBodyProps,
  type TableCellProps,
  type TableFooterProps,
  type TableRowProps,
  type Theme,
} from "@mui/material";
import { COMPONENT_NAME } from "../constants";

/**
 * Get color-mode-aware border color
 */
export function getBorderColor(theme: Theme) {
  return theme.palette.mode === "light"
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68);
}

export const GridRow: StyledComponent<TableRowProps> = styled(
  (props) => <TableRow component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Row",
  }
)(() => ({
  display: "flex",
  width: "fit-content",
  breakInside: "avoid",

  [`& .${tableCellClasses.root}`]: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

export const GridCell: StyledComponent<TableCellProps> = styled(
  (props) => <TableCell component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Cell",
  }
)({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  padding: "0 10px",
  borderBottom: 0,
});

export const GridBodyContainer: StyledComponent<TableBodyProps> = styled(
  (props) => <TableBody component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Body",
  }
)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  overflow: "auto",

  [`& .${tableCellClasses.root}`]: {
    borderBottom: `1px solid ${getBorderColor(theme)}`,
  },
}));

export const GridFooter: StyledComponent<TableFooterProps> = styled(
  (props) => <TableFooter component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Footer",
  }
)({
  display: "flex",
});
