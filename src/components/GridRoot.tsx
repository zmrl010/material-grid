import { ForwardedRef, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import { Table, TableProps } from "@mui/material";

const PREFIX = "Grid";

const classes = {
  root: `${PREFIX}-root`,
  autoHeight: `${PREFIX}-autoHeight`,
  head: `${PREFIX}-head`,
  body: `${PREFIX}-body`,
  overlay: `${PREFIX}-overlay`,
  cell: `${PREFIX}-cell`,
  row: `${PREFIX}-row`,
  rowDragging: `${PREFIX}-rowDragging`,
  dragHandle: `${PREFIX}-dragHandle`,
};

const StyledTable = styled(Table)(({ theme }) => ({
  boxSizing: "border-box",
  color: theme.palette.text.primary,
  ...theme.typography.body2,
  outline: "none",
  height: "100%",
  display: "block",
  overflow: "auto",

  "& *, & *::before, & *::after": {
    boxSizing: "inherit",
  },
  [`& .${classes.autoHeight}`]: {
    height: "auto",
  },
  [`& .${classes.head}`]: {
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  [`& .${classes.body}`]: {
    overflowY: "auto",
    overflowX: "hidden",
    display: "block",
    position: "relative",
  },
  [`& .${classes.overlay}`]: {
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
  },
  [`& .${classes.cell}`]: {
    display: "flex",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
  },
  [`& .${classes.row}`]: {
    backgroundColor: theme.palette.background.paper,
    // width: "fit-content",
  },
  [`& .${classes.rowDragging}`]: {
    display: "table",
  },
  [`& .${classes.dragHandle}`]: {
    display: "flex",
  },
}));

export {};

export type GridRootProps = TableProps;

export const GridRoot = forwardRef(function GridRoot(
  props: GridRootProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledTable
      //@ts-ignore - ref from styled table isnt narrowed by component properly
      ref={ref}
      tabIndex={0}
      component={"div"}
      {...props}
    />
  );
});

export default GridRoot;
