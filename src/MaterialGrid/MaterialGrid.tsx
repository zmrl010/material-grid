import { memo } from "react";
import Grid from "../components/Grid";
import useGridTable, { UseGridTableProps } from "./useGridTable";
import { type RowData } from "@tanstack/react-table";
import { type GridProps } from "../components/Grid";

export interface MaterialGridProps<TData extends RowData>
  extends Partial<Omit<GridProps<TData>, "table">>,
    UseGridTableProps<TData> {}

function MaterialGrid<TData extends RowData>({
  style,
  className,
  ...props
}: MaterialGridProps<TData>) {
  const table = useGridTable<TData>(props);

  return <Grid table={table} style={style} className={className} />;
}

export default memo(MaterialGrid) as typeof MaterialGrid;
