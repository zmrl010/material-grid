import { Box } from "@mui/material";
import { Cell, flexRender, type RowData } from "@tanstack/react-table";
import GridCell from "./GridCell";

export interface GridBodyCellProps<TData extends RowData> {
  cell: Cell<TData, unknown>;
  rowHeight?: number;
}

export default function GridBodyCell<TData extends RowData>({
  cell,
  rowHeight,
}: GridBodyCellProps<TData>): JSX.Element {
  const width = cell.column.getSize();
  return (
    <GridCell
      sx={{
        width,
        minWidth: width,
        maxWidth: width,
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
