import { TableHead, TableRow } from "@mui/material";
import type { HeaderGroup, RowData } from "@tanstack/react-table";
import type { CSSProperties } from "react";
import GridHeaderCell from "./GridHeaderCell";

export interface GridHeadProps<TData extends RowData> {
  headerGroups: HeaderGroup<TData>[];
  width?: CSSProperties["width"];
  height: string | number;
}

export default function GridHead<TData extends RowData>({
  headerGroups,
  width,
  height,
}: GridHeadProps<TData>) {
  return (
    <TableHead
      component="div"
      sx={{
        width,
        minHeight: height,
        maxHeight: height,
        lineHeight: height,
      }}
    >
      {headerGroups.map((headerGroup) => (
        <TableRow component="div" key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <GridHeaderCell header={header} key={header.id} />
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}
