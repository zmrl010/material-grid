import { type TableProps } from "@mui/material";
import type { RowData, Table } from "@tanstack/react-table";
import { GridRoot } from "./GridRoot";
import GridColumnHeaders from "./GridColumnHeaders";
import GridMain from "./GridMain";

export interface GridProps<TData extends RowData> extends TableProps {
  /**
   * Loading state; displays a spinner if true
   */
  loading?: boolean;
  table: Table<TData>;
  /**
   * @default
   * 56
   */
  headHeight?: number;
  /**
   * @default
   * 52
   */
  rowHeight?: number;
}

export default function Grid<TData extends RowData>({
  loading,
  table,
  headHeight = 56,
  rowHeight = 52,
  ...props
}: GridProps<TData>) {
  return (
    <GridRoot {...props}>
      <GridMain
        table={table}
        rowHeight={rowHeight}
        headHeight={headHeight}
        loading={loading}
        ColumnHeaders={GridColumnHeaders}
      />
    </GridRoot>
  );
}
