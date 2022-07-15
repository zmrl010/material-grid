import {
  CircularProgress,
  TableBody,
  TableBodyProps,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { flexRender, Row, type RowData } from "@tanstack/react-table";
import type { CSSProperties, ForwardedRef } from "react";
import Overlay from "./Overlay";

export interface GridBodyRowsProps<TData extends RowData> {
  loading?: boolean;
  rows?: Row<TData>[];
}

function GridBodyRows<TData extends RowData>({
  loading,
  rows = [],
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
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export interface GridBodyProps<TData extends RowData>
  extends TableBodyProps,
    GridBodyRowsProps<TData> {
  height: CSSProperties["height"];
  bodyRef: ForwardedRef<HTMLTableSectionElement>;
}

export default function GridBody<TData extends RowData>({
  height,
  rows,
  loading,
  bodyRef,
  ...props
}: GridBodyProps<TData>) {
  return (
    <TableBody ref={bodyRef} sx={{ height }} {...props}>
      <GridBodyRows rows={rows} loading={loading} />
    </TableBody>
  );
}
