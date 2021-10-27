import { styled, TableCell, TableCellProps } from "@mui/material";
import { forwardRef } from "react";

export interface GridCellProps extends TableCellProps {}

const DivCell = forwardRef<HTMLDivElement, GridCellProps>((props, ref) => (
  <TableCell component="div" ref={ref} {...props} />
));

export const GridCell = styled(DivCell, { name: "Grid", slot: "Cell" })(
  ({ theme }) => ({
    display: "flex",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
  })
);

export default GridCell;
