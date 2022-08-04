import { useEventCallback } from "@mui/material";
import {
  useReactTable,
  type TableOptions,
  type RowData,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type Table,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { defaultMeta } from "../meta";

export default function useGridTable<TData extends RowData>(
  columns: ColumnDef<TData, unknown>[],
  data: TData[],
  options: TableOptions<TData> | undefined
): Table<TData> {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ height: 0, width: 0 });

  const handleResize = useEventCallback(() => {
    if (!rootRef.current) {
      return;
    }
    setSize({
      height: rootRef.current.clientHeight,
      width: rootRef.current.clientWidth,
    });
  });

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }
    const observer = new ResizeObserver(() => handleResize());

    observer.observe(rootRef.current);

    return () => observer.disconnect();
  }, [handleResize]);

  return useReactTable<TData>({
    columns,
    data,
    ...options,
    meta: {
      ...defaultMeta,
      rootRef,
      size,
      ...options?.meta,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });
}
