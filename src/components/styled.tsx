import { StyledComponent } from "@emotion/styled";
import {
  alpha,
  darken,
  lighten,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableFooter,
  TableHead,
  TableRow,
  type TableBodyProps,
  type TableCellProps,
  type TableFooterProps,
  type TableHeadProps,
  type TableProps,
  type TableRowProps,
  type Theme,
} from "@mui/material";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

const COMPONENT_NAME = "MaterialGrid";

/**
 * Get color-mode-aware border color
 */
function getBorderColor(theme: Theme) {
  return theme.palette.mode === "light"
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68);
}

export const GridRoot: StyledComponent<TableProps> = styled(
  (props) => <Table component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Root",
  }
)(({ theme }) => ({
  flex: 1,
  boxSizing: "border-box",
  position: "relative",
  border: `1px solid ${getBorderColor(theme)}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
  ...theme.typography.body2,
  outline: "none",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const GridMainContainer: StyledComponent<
  ComponentPropsWithoutRef<"div">
> = styled("div", {
  name: COMPONENT_NAME,
  slot: "Main",
})(() => ({
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

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
}));

export const GridCell: StyledComponent<TableCellProps> = styled(
  (props) => <TableCell component="div" {...props} />,
  { name: COMPONENT_NAME, slot: "Cell" }
)({
  display: "flex",
  alignItems: "center",
});

export const GridBodyContainer: StyledComponent<TableBodyProps> = styled(
  (props) => <TableBody component="div" {...props} />,
  { name: COMPONENT_NAME, slot: "Body" }
)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",

  [`& .${tableCellClasses.root}`]: {
    padding: theme.spacing(1),
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

export const GridHeadRoot: StyledComponent<ComponentPropsWithRef<"div">> =
  styled(
    forwardRef<HTMLDivElement, TableHeadProps>(function GridHead(props, ref) {
      return <TableHead component="div" {...props} ref={ref} />;
    }),
    {
      name: COMPONENT_NAME,
      slot: "Head",
    }
  )(({ theme }) => ({
    display: "flex",
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottom: `1px solid ${getBorderColor(theme)}`,
  }));

export const Overlay: StyledComponent<ComponentPropsWithoutRef<"div">> = styled(
  "div",
  {
    name: COMPONENT_NAME,
    slot: "Overlay",
  }
)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
}));
