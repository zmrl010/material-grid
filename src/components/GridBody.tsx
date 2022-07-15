import {
  CircularProgress,
  TableBody,
  type TableBodyProps,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { flexRender, type Row, type RowData } from "@tanstack/react-table";
import type { ForwardedRef } from "react";
import { Overlay } from "./styled";

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
        <TableRow
          component="div"
          sx={{
            display: "flex",
            width: "fit-content",
            minHeight: 52,
            maxHeight: 52,
            breakInside: "avoid",
          }}
          key={row.id}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell component="div" key={cell.id}>
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
  bodyRef: ForwardedRef<HTMLTableSectionElement>;
}

export default function GridBody<TData extends RowData>({
  rows,
  loading,
  bodyRef,
  ...props
}: GridBodyProps<TData>) {
  return (
    <TableBody component="div" ref={bodyRef} {...props}>
      <TableBody component="div">
        <GridBodyRows rows={rows} loading={loading} />
      </TableBody>
    </TableBody>
  );
}
