import { type Table, type RowData } from "@tanstack/react-table";
import { type JSXElementConstructor, useRef } from "react";
import GridOverlays from "./GridOverlays";
import { GridMainContainer } from "../styled";
import { GridColumnHeadersProps } from "../GridColumnHeaders";
import useScrollbarSizeDetector from "../../hooks/useScrollbarSizeDetector";
import GridAutoSizer from "../GridAutoSizer";
import GridPanel from "../GridPanel";

export interface GridBodyProps<TData extends RowData> {
  table: Table<TData>;
  loading?: boolean;
  headHeight: number;
  rowHeight: number;
  ColumnHeaders: JSXElementConstructor<GridColumnHeadersProps<TData>>;
}

export default function GridBody<TData extends RowData>({
  table,
  loading,
  headHeight,
  rowHeight,
  ColumnHeaders,
}: GridBodyProps<TData>) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const bodyScrollbarSize = useScrollbarSizeDetector(bodyRef);
  const headWidth = `calc(100% - ${bodyScrollbarSize}px)`;

  const { rows } = table.getRowModel();

  return (
    <GridMainContainer>
      <GridOverlays loading={loading} rows={rows} />
      <ColumnHeaders
        table={table}
        height={headHeight}
        width={headWidth}
        headRef={headRef}
      />
      <GridAutoSizer>
        {({ height, width }) => (
          <GridPanel
            table={table}
            rowHeight={rowHeight}
            style={{
              width,
              height: height ? height - headHeight : "auto",
              marginTop: headHeight,
            }}
          />
        )}
      </GridAutoSizer>
    </GridMainContainer>
  );
}
