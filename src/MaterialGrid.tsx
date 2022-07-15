import {
  useReactTable,
  type TableOptions,
  type RowData,
  getCoreRowModel,
} from "@tanstack/react-table";
import { type TableProps } from "@mui/material";
import GridRoot from "./components/GridRoot";

export interface MaterialGridProps<TData extends RowData>
  extends Pick<TableOptions<TData>, "data" | "columns">,
    TableProps {
  /**
   * Loading state
   */
  loading?: boolean;
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

  return <GridRoot table={table} {...tableProps} />;
}
