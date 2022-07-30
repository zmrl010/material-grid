import type { RowData, Table } from "@tanstack/react-table";
import GridHeadCell from "./GridHeadCell";
import { GridRow } from "./styled";
import { GridHeadRoot } from "./GridHeadRoot";

export interface GridColumnHeadersProps<TData extends RowData> {
  table: Table<TData>;
  width?: string | number;
  height: string | number;
}

export default function GridColumnHeaders<TData extends RowData>({
  table,
  width,
  height,
}: GridColumnHeadersProps<TData>) {
  return (
    <GridHeadRoot
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
            <GridHeadCell header={header} key={header.id} />
          ))}
        </GridRow>
      ))}
    </GridHeadRoot>
  );
}
