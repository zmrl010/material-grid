import { type RowData, type Table } from "@tanstack/react-table";
import { type CSSProperties } from "react";
import { GridBodyCell } from "./GridBodyCell";
import { GridRow, GridBodyContainer } from "./styled";

export interface GridBodyProps<TData extends RowData> {
  table: Table<TData>;
  rowHeight?: number;
  style?: CSSProperties;
}

export default function GridBody<TData extends RowData>({
  table,
  style,
  rowHeight,
}: GridBodyProps<TData>) {
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
            <GridBodyCell key={cell.id} cell={cell} rowHeight={rowHeight} />
          ))}
        </GridRow>
      ))}
    </GridBodyContainer>
  );
}
