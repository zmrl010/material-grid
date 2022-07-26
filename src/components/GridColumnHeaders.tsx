import type { RowData, Table } from "@tanstack/react-table";
import { type CSSProperties, type Ref } from "react";
import GridHeaderCell from "./GridHeaderCell";
import { GridHeadRoot, GridRow } from "./styled";

export interface GridColumnHeadersProps<TData extends RowData> {
  table: Table<TData>;
  width?: CSSProperties["width"];
  height: string | number;
  headRef: Ref<HTMLDivElement>;
}

export default function GridColumnHeaders<TData extends RowData>({
  table,
  width,
  height,
  headRef,
}: GridColumnHeadersProps<TData>) {
  return (
    <GridHeadRoot
      ref={headRef}
      style={{
        width,
        minHeight: height,
        maxHeight: height,
        lineHeight: height,
      }}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <GridRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <GridHeaderCell header={header} key={header.id} />
          ))}
        </GridRow>
      ))}
    </GridHeadRoot>
  );
}
