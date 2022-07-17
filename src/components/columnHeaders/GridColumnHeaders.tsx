import type { HeaderGroup, RowData } from "@tanstack/react-table";
import type { CSSProperties } from "react";
import GridHeaderCell from "../GridHeaderCell";
import { GridHeadRoot, GridRow } from "../styled";

export interface GridColumnHeadersProps<TData extends RowData> {
  headerGroups: HeaderGroup<TData>[];
  width?: CSSProperties["width"];
  height: string | number;
}

export default function GridColumnHeaders<TData extends RowData>({
  headerGroups,
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
      {headerGroups.map((headerGroup) => (
        <GridRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <GridHeaderCell header={header} key={header.id} />
          ))}
        </GridRow>
      ))}
    </GridHeadRoot>
  );
}
