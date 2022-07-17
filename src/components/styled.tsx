import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  type TableHeadProps,
  TableRow,
  type TableCellProps,
  type TableRowProps,
  type TableProps,
  type TableBodyProps,
  type TableFooterProps,
  lighten,
  alpha,
  darken,
} from "@mui/material";

const COMPONENT_NAME = "MaterialGrid";

// export const GridRoot = styled(TableContainer, {
//   name: NAME,
//   slot: "Root",
// })(({ theme }) => {
//   const borderColor =
//     theme.palette.mode === "light"
//       ? lighten(alpha(theme.palette.divider, 1), 0.88)
//       : darken(alpha(theme.palette.divider, 1), 0.88);

//   return {
//     ...theme.typography.body2,
//     boxSizing: "border-box",
//     color: theme.palette.text.primary,
//     border: `1px solid ${borderColor}`,
//     borderRadius: theme.shape.borderRadius,
//     height: "100%",
//     width: "100%",
//     display: "flex",
//     outline: "none",
//     flexDirection: "column",
//     flex: "1 1 0%",
//     position: "relative",
//   };
// });

// export const GridMainContainer = styled(
//   (props: TableProps) => <Table component="div" {...props} />,
//   { name: NAME, slot: "Main" }
// )({
//   display: "flex",
//   flexDirection: "column",
//   position: "relative",
//   flex: 1,
//   overflow: "hidden",
// });

export const GridRoot = styled(
  (props: TableProps) => <Table component="div" {...props} />,
  { name: COMPONENT_NAME, slot: "Root" }
)(({ theme }) => {
  const borderColor =
    theme.palette.mode === "light"
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68);

  return {
    flex: "1",
    boxSizing: "border-box",
    position: "relative",
    border: `1px solid ${borderColor}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    ...theme.typography.body2,
    outline: "none",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };
});

export const GridMainContainer = styled("div", {
  name: COMPONENT_NAME,
  slot: "Main",
})(() => ({
  position: "relative",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const GridRow = styled(
  (props: TableRowProps) => <TableRow component="div" {...props} />,
  { name: COMPONENT_NAME, slot: "Row" }
)({
  display: "flex",
  width: "fit-content",
  breakInside: "avoid",
});

export const GridCell = styled(
  (props: TableCellProps) => <TableCell component="div" {...props} />,
  { name: COMPONENT_NAME, slot: "Cell" }
)({});

export const GridBodyContainer = styled(
  (props: TableBodyProps) => <TableBody component="div" {...props} />,
  { name: COMPONENT_NAME, slot: "Body" }
)({});

export const GridFooter = styled(
  (props: TableFooterProps) => <TableFooter component="div" {...props} />,
  { name: COMPONENT_NAME, slot: "Footer" }
)({});

export const GridHeadRoot = styled(
  (props: TableHeadProps) => <TableHead component="div" {...props} />,
  { name: COMPONENT_NAME, slot: "Head" }
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
}));

export const Overlay = styled("div")(({ theme }) => ({
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
