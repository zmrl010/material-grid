import {
  useReactTable,
  type TableOptions,
  type RowData,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type Table,
} from "@tanstack/react-table";
import { useRef } from "react";
import useElementSize from "../hooks/useElementSize";
import { defaultMeta } from "../meta";

export default function useGridTable<TData extends RowData>(
  columns: ColumnDef<TData, unknown>[],
  data: TData[],
  options: TableOptions<TData> | undefined
): Table<TData> {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { clientHeight: height, clientWidth: width } = useElementSize(rootRef);

  return useReactTable<TData>({
    columns,
    data,
    ...options,
    meta: {
      ...defaultMeta,
      rootRef,
      size: {
        height,
        width,
      },
      ...options?.meta,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });
}
