import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFlexLayout,
} from "react-table";
import { useMemo, useRef } from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { NoSsr, TableProps } from "@mui/material";
import { GridRoot, GridProvider } from "./components";
import { GridOptions, Id, RowReorderEvent } from "./types";
import { useRowDragDrop, dragHandleColumn } from "./plugins/useRowDragDrop";
import { useOrderedRows } from "./hooks/useOrderedRows";

function defaultGetRowId<D extends Id>(row: D) {
  return row.id.toString();
}

export interface GridEvents<D extends Id = Id> {
  onRowReorder?: RowReorderEvent<D>;
}

export interface GridProps<D extends Id = Id>
  extends GridOptions<D>,
    GridEvents<D>,
    TableProps {
  loading?: boolean;
}

/**
 * Main grid component
 * @param props
 */
export function Grid<D extends Id = Id>(props: GridProps<D>) {
  const {
    columns,
    data,
    onRowReorder,
    dragDropEvents,
    enableRowDragDrop = false,
    loading = false,
    defaultCanSort = false,
    disableSortBy = false,
    getRowId = defaultGetRowId,
    ...tableProps
  } = props;

  const [orderedRows, moveRow] = useOrderedRows(data, onRowReorder);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const columnsWithDragHandle = useMemo(
    () => [dragHandleColumn, ...columns],
    [columns]
  );
  const instance = useTable(
    {
      columns: columnsWithDragHandle,
      data: orderedRows,
      disableSortBy,
      defaultCanSort,
      getRowId,
      enableRowDragDrop,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    useRowDragDrop,
    useFlexLayout
  );

  const events = useMemo(
    () => ({
      ...dragDropEvents,
      onDragEnd: (result: DropResult, provided: ResponderProvided) => {
        if (result.destination) {
          moveRow(result.source.index, result.destination.index);
        }
        dragDropEvents?.onDragEnd?.(result, provided);
      },
    }),
    [dragDropEvents, moveRow]
  );

  return (
    <GridProvider<D> instance={instance} {...events}>
      <NoSsr>
        <GridRoot {...instance.getTableProps(tableProps)} ref={rootRef} />
      </NoSsr>
    </GridProvider>
  );
}

export default Grid;
