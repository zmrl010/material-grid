import {
  useReactTable,
  type TableOptions,
  type RowData,
  getCoreRowModel,
  getSortedRowModel,
  // getPaginationRowModel,
} from "@tanstack/react-table";
import { memo } from "react";
import Grid, { type GridProps } from "../components/Grid";

export interface MaterialGridProps<TData extends RowData>
  extends Pick<TableOptions<TData>, "data" | "columns">,
    Partial<GridProps<TData>> {
  /**
   * Additional options passed to `useReactTable`
   */
  options?: TableOptions<TData>;
}

function MaterialGridBase<TData extends RowData>({
  columns,
  data,
  options,
  ...tableProps
}: MaterialGridProps<TData>) {
  const table = useReactTable<TData>({
    columns,
    data,
    ...options,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });

  return <Grid table={table} {...tableProps} />;
}

const MaterialGrid = memo(MaterialGridBase) as typeof MaterialGridBase;

export default MaterialGrid;
