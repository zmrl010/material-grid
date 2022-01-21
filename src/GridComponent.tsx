import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFlexLayout,
} from "react-table";
import { useCallback, useMemo, useRef } from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { NoSsr, TableProps } from "@mui/material";
import {
  GridRoot,
  GridHeader,
  GridProvider,
  GridBody,
  dragHandleColumn,
} from "./components";
import { GridOptions, Id, RowReorderEvent } from "./types";
import {
  useBoundingRect,
  useComponents,
  useScrollbarSizeDetector,
} from "./hooks";
import { useRowDragDrop } from "./plugins/useRowDragDrop";
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
 *
 * @todo implement styling overrides (classes prop) for all components
 * @todo wrap entire component in error boundary
 */
export function Grid<D extends Id = Id>(props: GridProps<D>) {
  const {
    columns,
    data,
    components: propComponents,
    dragDropEvents = {},
    enableRowDragDrop = false,
    loading = false,
    onRowReorder,
    defaultCanSort = true,
    disableSortBy = false,
    getRowId = defaultGetRowId,
    ...tableProps
  } = props;

  const [orderedRows, moveRow] = useOrderedRows(data, onRowReorder);
  const components = useComponents(propComponents);
  const [headerBoundingRect, headerRef] = useBoundingRect();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const scrollbarSize = useScrollbarSizeDetector(bodyRef);
  const columnsWithDragHandle = useMemo(() => [dragHandleColumn, ...columns], [
    columns,
  ]);
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

  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      if (result.destination) {
        moveRow(result.source.index, result.destination.index);
      }
      dragDropEvents.onDragEnd?.(result, provided);
    },
    [moveRow, dragDropEvents.onDragEnd]
  );

  const events = useMemo(
    () => ({
      ...dragDropEvents,
      onDragEnd,
    }),
    [dragDropEvents, onDragEnd]
  );

  const headerWidth = `calc(100% - ${scrollbarSize}px)`;
  const bodyHeight = headerBoundingRect
    ? `calc(100% - ${headerBoundingRect.height || 0}px)`
    : "100%";

  return (
    <GridProvider<D> instance={instance} components={components} {...events}>
      <NoSsr>
        <GridRoot {...instance.getTableProps(tableProps)} ref={rootRef}>
          <GridHeader width={headerWidth} ref={headerRef} />
          <GridBody loading={loading} height={bodyHeight} ref={bodyRef} />
        </GridRoot>
      </NoSsr>
    </GridProvider>
  );
}

export default Grid;
