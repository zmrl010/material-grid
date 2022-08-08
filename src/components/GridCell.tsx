import { styled, TableCell, type TableCellProps } from "@mui/material";
import clsx from "clsx";
import { forwardRef } from "react";
import { GRID_COMPONENT_NAME } from "../constants";
import { gridClasses } from "../style/gridClasses";

const GridCellBase = styled(TableCell, {
  name: GRID_COMPONENT_NAME,
  slot: "Cell",
})({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  padding: "0 10px",
  borderBottom: 0,
});

const GridCell = forwardRef<HTMLDivElement, TableCellProps>(function GridCell(
  { className, ...props },
  ref
) {
  return (
    <GridCellBase
      ref={ref}
      role="cell"
      component="div"
      className={clsx(className, gridClasses.cell)}
      {...props}
    />
  );
});

export default GridCell;
