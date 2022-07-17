import { flexRender, type Row, type RowData } from "@tanstack/react-table";
import type { ForwardedRef } from "react";
import GridOverlays, { GridOverlaysProps } from "./GridOverlays";
import { GridCell, GridMainContainer, GridRow } from "../styled";

export interface GridBodyProps<TData extends RowData>
  extends GridOverlaysProps {
  rows?: Row<TData>[];
  bodyRef: ForwardedRef<HTMLTableSectionElement>;
  rowHeight?: string | number;
}

export default function GridBody<TData extends RowData>({
  rows = [],
  loading,
  bodyRef,
  rowHeight,
}: GridBodyProps<TData>) {
  return (
    <GridMainContainer>
      <GridOverlays loading={loading} rows={rows} />
      {rows.map((row) => (
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
    </GridMainContainer>
  );
}
