import {
  TableContainer,
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
} from "@mui/material";

const NAME = "Grid";

export const GridContainer = styled(TableContainer, {
  name: NAME,
  slot: "Container",
})(({ theme }) => ({
  ...theme.typography.body2,
  boxSizing: "border-box",
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  height: "100%",
  width: "100%",
  display: "flex",
  outline: "currentcolor none medium",
  flexDirection: "column",
  flex: "1 1 0%",
  position: "relative",
}));

export const GridMain = styled(
  (props: TableProps) => <Table component="div" {...props} />,
  { name: NAME, slot: "Main" }
)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  flex: 1,
  overflow: "hidden",
});

export const GridRow = styled(
  (props: TableRowProps) => <TableRow component="div" {...props} />,
  { name: NAME, slot: "Row" }
)({});

export const GridCell = styled(
  (props: TableCellProps) => <TableCell component="div" {...props} />,
  { name: NAME, slot: "Cell" }
)({});

export const GridBodyRoot = styled(
  (props: TableBodyProps) => <TableBody component="div" {...props} />,
  { name: NAME, slot: "Body" }
)({});

export const GridFooter = styled(
  (props: TableFooterProps) => <TableFooter component="div" {...props} />,
  { name: NAME, slot: "Footer" }
)({});

export const GridHeadRoot = styled(
  (props: TableHeadProps) => <TableHead component="div" {...props} />,
  { name: NAME, slot: "Head" }
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
