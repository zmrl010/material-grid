import { type TableOptions, type RowData } from "@tanstack/react-table";
import { memo } from "react";
import Grid, { type GridProps } from "../components/Grid";
import useGridTable from "./useGridTable";

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
  const table = useGridTable<TData>(columns, data, options);

  return <Grid table={table} {...tableProps} />;
}

export default memo(MaterialGridBase) as typeof MaterialGridBase;
