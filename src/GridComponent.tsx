import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFlexLayout,
} from "react-table";
import { useCallback, useMemo, useRef } from "react";
import { useImmer } from "use-immer";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { Draft, current } from "immer";
import { NoSsr, TableProps } from "@mui/material";
import {
  GridRoot,
  GridHeader,
  GridProvider,
  GridBody,
  dragHandleColumn,
} from "./components";
import { GridOptions, Id } from "./types";
import {
  useBoundingRect,
  useComponents,
  useIsomorphicEffect,
  useScrollbarSizeDetector,
} from "./hooks";
import { useRowDragDrop } from "./plugins/useRowDragDrop";

function defaultGetRowId<D extends Id>(row: D) {
  return row.id.toString();
}

export interface GridEvents<D extends Id = Id> {
  onRowReorder?: (
    data: D[],
    sourceIndex: number,
    destinationIndex: number
  ) => void;
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
    onRowReorder = () => {},
    defaultCanSort = true,
    disableSortBy = false,
    getRowId = defaultGetRowId,
    ...tableProps
  } = props;

  const [orderedData, setOrderedData] = useImmer(data);
  // effect to "reset" the data when data prop changes
  const prevData = useRef(data);
  useIsomorphicEffect(() => {
    if (prevData.current !== data) {
      setOrderedData(data);
      prevData.current = data;
    }
  }, [data]);
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
      data: orderedData,
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

  const reorder = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      setOrderedData((draftRecords) => {
        const [record] = draftRecords.splice(sourceIndex, 1);
        draftRecords.splice(destinationIndex, 0, record as Draft<D>);

        // FIXME propper typing needed to avoid assertion
        onRowReorder(
          current(draftRecords) as D[],
          sourceIndex,
          destinationIndex
        );
      });
    },
    [onRowReorder]
  );

  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      if (result.destination) {
        reorder(result.source.index, result.destination.index);
      }
      dragDropEvents.onDragEnd?.(result, provided);
    },
    [reorder, dragDropEvents.onDragEnd]
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

  // TODO wrap in Box component?
  return (
    <GridProvider<D> instance={instance} components={components} {...events}>
      <NoSsr>
        <GridRoot {...instance.getTableProps(tableProps)} ref={rootRef}>
          <GridHeader ref={headerRef} style={{ width: headerWidth }} />
          <GridBody
            loading={loading}
            style={{ height: bodyHeight }}
            ref={bodyRef}
          />
        </GridRoot>
      </NoSsr>
    </GridProvider>
  );
}

export default Grid;
