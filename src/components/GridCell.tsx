import { TableCell, TableCellProps } from "@material-ui/core";
import clsx from "clsx";
import { forwardRef } from "react";

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
      className={clsx("Grid-cell", className)}
      ref={ref}
      {...cellProps}
    >
      {children}
    </TableCell>
  );
});

export default GridCell;
