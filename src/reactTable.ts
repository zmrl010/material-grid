import {
  type ColumnDef as ColumnDefBase,
  type RowData,
  type TableOptions,
  createColumnHelper,
} from "@tanstack/react-table";

type ColumnDef<TData extends RowData, TValue = unknown> = ColumnDefBase<
  TData,
  TValue
>;

export type { RowData, TableOptions, ColumnDef };
export { createColumnHelper };
