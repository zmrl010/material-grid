import {
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { DragHandle, DragIndicator } from "@material-ui/icons";
import { ForwardedRef, forwardRef } from "react";
import { Row, TableRowProps } from "react-table";

export const ItemTypes = {
  ROW: "row",
};

export interface RowItem {
  index: number;
}

export interface GridRowProps<D extends object = {}> extends TableRowProps {
  row: Row<D>;
}

/**
 * Datatable Row with custom functionality
 * @param props
 * @returns
 */
export const GridRow = forwardRef(function GridRow<D extends object = {}>(
  props: GridRowProps<D>,
  ref: ForwardedRef<HTMLTableRowElement>
) {
  const { row } = props;

  const { style, ...rowProps } = row.getRowProps();

  return (
    <TableRow ref={ref} {...rowProps}>
      <DragHandle />
      {row.cells.map((cell) => (
        <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
      ))}
    </TableRow>
  );
});

export default GridRow;
