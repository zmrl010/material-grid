import {
  CircularProgress,
  TableBody,
  type TableBodyProps,
  Typography,
} from "@mui/material";
import { flexRender, type Row, type RowData } from "@tanstack/react-table";
import type { ForwardedRef } from "react";
import { GridCell, GridRow, Overlay } from "./styled";

export interface GridBodyRowsProps<TData extends RowData> {
  loading?: boolean;
  rows?: Row<TData>[];
  rowHeight?: string | number;
}

function GridBodyRows<TData extends RowData>({
  loading,
  rows = [],
  rowHeight,
}: GridBodyRowsProps<TData>) {
  if (loading) {
    return (
      <Overlay>
        <CircularProgress />
      </Overlay>
    );
  }

  if (rows.length === 0) {
    return (
      <Overlay>
        <Typography>No data to display.</Typography>
      </Overlay>
    );
  }

  return (
    <>
      {rows.map((row) => (
        <GridRow
          sx={{
            display: "flex",
            width: "fit-content",
            minHeight: rowHeight,
            maxHeight: rowHeight,
            breakInside: "avoid",
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
    </>
  );
}

export interface GridBodyProps<TData extends RowData>
  extends TableBodyProps,
    GridBodyRowsProps<TData> {
  bodyRef: ForwardedRef<HTMLTableSectionElement>;
}

export default function GridBody<TData extends RowData>({
  rows,
  loading,
  bodyRef,
  rowHeight,
  ...props
}: GridBodyProps<TData>) {
  return (
    <TableBody component="div" ref={bodyRef} {...props}>
      <GridBodyRows rows={rows} loading={loading} rowHeight={rowHeight} />
    </TableBody>
  );
}
