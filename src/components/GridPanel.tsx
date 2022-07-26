import { flexRender, RowData, Table } from "@tanstack/react-table";
import { CSSProperties } from "react";
import { GridRow, GridCell } from "./styled";

interface GridPanelProps<TData extends RowData> {
  table: Table<TData>;
  rowHeight?: CSSProperties["height"];
  style?: CSSProperties;
}

export default function GridPanel<TData extends RowData>({
  table,
  style,
  rowHeight,
}: GridPanelProps<TData>) {
  return (
    <div style={style}>
      {table.getRowModel().rows.map((row) => (
        <GridRow
          sx={{
            minHeight: rowHeight,
            maxHeight: rowHeight,
          }}
          key={row.id}
        >
          {row.getVisibleCells().map((cell) => (
            <GridCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </GridCell>
          ))}
        </GridRow>
      ))}
    </div>
  );
}
