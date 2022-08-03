import { type TableProps } from "@mui/material";
import type { RowData, Table } from "@tanstack/react-table";
import GridRoot from "./GridRoot";
import GridColumnHeaders from "./GridColumnHeaders";
import GridMain from "./GridMain";
import { GridMeta } from "../meta";

export interface GridProps<TData extends RowData> extends TableProps, GridMeta {
  /**
   * React Table instance
   */
  table: Table<TData>;
}

export default function Grid<TData extends RowData>({
  table,
  ...props
}: GridProps<TData>) {
  return (
    <GridRoot {...props}>
      <GridMain table={table} ColumnHeaders={GridColumnHeaders} />
    </GridRoot>
  );
}
