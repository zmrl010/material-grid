import { ForwardedRef, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import { Table, TableProps, TableContainer, Paper } from "@mui/material";

export type GridRootProps = TableProps;

const GridRootBase = forwardRef(function GridRootBase(
  props: GridRootProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <TableContainer component={Paper}>
      <Table ref={ref} tabIndex={0} component={"div"} {...props} />
    </TableContainer>
  );
});

export const GridRoot = styled(GridRootBase, {
  name: "Grid",
  slot: "Root",
})(({ theme }) => ({
  boxSizing: "border-box",
  color: theme.palette.text.primary,
  outline: "none",
  height: "100vh",
  display: "table",
  flexFlow: "column nowrap",
  overflow: "auto",

  "& *, & *::before, & *::after": {
    boxSizing: "inherit",
  },
}));

export default GridRoot;
