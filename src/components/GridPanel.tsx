import { flexRender, RowData, Table } from "@tanstack/react-table";
import { CSSProperties } from "react";
import { GridRow, GridCell, GridBodyContainer } from "./styled";

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
    <GridBodyContainer style={style}>
      {table.getRowModel().rows.map((row) => (
        <GridRow
          sx={{
            minHeight: rowHeight,
            maxHeight: rowHeight,
          }}
          key={row.id}
        >
          {row.getVisibleCells().map((cell) => (
            <GridCell
              key={cell.id}
              width={cell.column.getSize()}
              sx={{
                minWidth: cell.column.getSize(),
                maxWidth: cell.column.getSize(),
                minHeight: rowHeight,
                maxHeight: rowHeight,
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </GridCell>
          ))}
        </GridRow>
      ))}
    </GridBodyContainer>
  );
}
