import {
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type RowData,
  type Table,
  type TableOptions,
} from "@tanstack/react-table";
import { useRef } from "react";
import useElementSize from "../hooks/useElementSize";
import { defaultMeta, type GridMetaProps } from "../meta";

export interface UseGridTableProps<TData extends RowData>
  extends Pick<TableOptions<TData>, "data" | "columns">,
    Partial<GridMetaProps> {
  /**
   * Filter functions passed to `useReactTable`
   */
  filterFns?: Record<string, FilterFn<TData>>;
  /**
   * Additional options passed to `useReactTable`
   */
  options?: Partial<TableOptions<TData>>;
}

export default function useGridTable<TData extends RowData>({
  columns,
  data,
  filterFns,
  options: { meta, ...options } = {},
  loading,
}: UseGridTableProps<TData>): Table<TData> {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { clientHeight, clientWidth } = useElementSize(rootRef);

  return useReactTable<TData>({
    columns,
    data,
    filterFns,
    ...options,
    meta: {
      ...defaultMeta,
      rootRef,
      size: {
        height: clientHeight,
        width: clientWidth,
      },
      loading,
      ...meta,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });
}
