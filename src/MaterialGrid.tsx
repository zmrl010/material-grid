import {
  useReactTable,
  type TableOptions,
  type RowData,
  getCoreRowModel,
} from "@tanstack/react-table";
import Grid, { type GridProps } from "./components/Grid";

export interface MaterialGridProps<TData extends RowData>
  extends Pick<TableOptions<TData>, "data" | "columns">,
    Partial<GridProps<TData>> {
  /**
   * Additional options passed to `useReactTable`
   */
  options?: TableOptions<TData>;
}

export default function MaterialGrid<TData extends RowData>({
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
  });

  return <Grid table={table} {...tableProps} />;
}
