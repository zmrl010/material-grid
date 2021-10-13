import { TableCell, TableCellProps } from "@mui/material";
import clsx from "clsx";
import { forwardRef } from "react";
import { classes } from "./GridRoot";

export interface GridCellProps extends TableCellProps {}

type Props = GridCellProps;

export const GridCell = forwardRef<HTMLDivElement, Props>(function GridCell(
  props,
  ref
) {
  const { children, className, ...cellProps } = props;
  return (
    <TableCell
      component="div"
      className={clsx(classes.cell, className)}
      ref={ref}
      {...cellProps}
    >
      {children}
    </TableCell>
  );
});

export default GridCell;
