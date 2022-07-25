import { flexRender, Table, type RowData } from "@tanstack/react-table";
import { JSXElementConstructor, useRef } from "react";
import GridOverlays from "./GridOverlays";
import { GridCell, GridMainContainer, GridRow } from "../styled";
import { GridColumnHeadersProps } from "../columnHeaders/GridColumnHeaders";
import useScrollbarSizeDetector from "../../hooks/useScrollbarSizeDetector";

const DEFAULT_HEAD_HEIGHT = "56px";
const DEFAULT_ROW_HEIGHT = "52px";

export interface GridBodyProps<TData extends RowData> {
  table: Table<TData>;
  loading?: boolean;
  headHeight?: string | number;
  rowHeight?: string | number;
  ColumnHeaders: JSXElementConstructor<GridColumnHeadersProps<TData>>;
}

export default function GridBody<TData extends RowData>({
  table,
  loading,
  headHeight = DEFAULT_HEAD_HEIGHT,
  rowHeight = DEFAULT_ROW_HEIGHT,
  ColumnHeaders,
}: GridBodyProps<TData>) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const bodyScrollbarSize = useScrollbarSizeDetector(bodyRef);
  const headWidth = `calc(100% - ${bodyScrollbarSize}px)`;
  // const bodyHeight = `calc(100% - ${headHeight})`;

  const { rows } = table.getRowModel();

  return (
    <GridMainContainer ref={bodyRef}>
      <GridOverlays loading={loading} rows={rows} />
      <ColumnHeaders
        table={table}
        height={headHeight}
        width={headWidth}
        headRef={headRef}
      />
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
