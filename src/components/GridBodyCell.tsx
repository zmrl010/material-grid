import { Box } from "@mui/material";
import { Cell, flexRender, type RowData } from "@tanstack/react-table";
import { GridCell } from "./styled";

export interface GridBodyCellProps<TData extends RowData> {
  cell: Cell<TData, unknown>;
  rowHeight?: number;
}

export function GridBodyCell<TData extends RowData>({
  cell,
  rowHeight,
}: GridBodyCellProps<TData>): JSX.Element {
  return (
    <GridCell
      width={cell.column.getSize()}
      sx={{
        minWidth: cell.column.getSize(),
        maxWidth: cell.column.getSize(),
        minHeight: rowHeight,
        maxHeight: rowHeight,
      }}
    >
      <Box overflow="hidden" textOverflow="ellipsis">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Box>
    </GridCell>
  );
}
