import { useTable, useSortBy, useRowSelect, usePagination } from "react-table";
import { useCallback, useMemo } from "react";
import { useImmer } from "use-immer";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { Draft, current } from "immer";
import { TableProps } from "@material-ui/core";
import {
  GridRoot,
  GridHeader,
  GridProvider,
  GridBody,
  dragHandleColumn,
} from "./components";
import { GridOptions, Id } from "./types";
import { useBoundingRect, useComponents, useIsomorphicEffect } from "./hooks";

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
 */
export function Grid<D extends Id = Id>(props: GridProps<D>) {
  const {
    columns,
    data,

    components: propComponents,
    dragDropEvents = {},
    // changes in enableRowDragDrop prop won't have any effect after mount
    enableRowDragDrop = false,
    loading = false,
    onRowReorder = () => {},

    autoResetHiddenColumns,
    defaultCanSort = true,
    defaultColumn,
    disableSortBy = false,
    getRowId = defaultGetRowId,
    getSubRows,
    initialState,
    stateReducer,
    useControlledState,
    ...tableProps
  } = props;

  const [orderedData, setOrderedData] = useImmer(data);
  const components = useComponents(propComponents);

  const [headerBoundingRect, headerRef] = useBoundingRect();

  const instance = useTable(
    {
      columns,
      data: orderedData,
      disableSortBy,
      defaultCanSort,
      getRowId,
      initialState,
      stateReducer,
      useControlledState,
      defaultColumn,
      getSubRows,
      autoResetHiddenColumns,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    // TODO extract this to a hook (plugin)
    (hooks) => {
      if (enableRowDragDrop) {
        hooks.allColumns.push((columns) => [dragHandleColumn, ...columns]);
      }
    }
    // useFlexLayout
  );

  // effect to "reset" the data when data prop changes
  useIsomorphicEffect(() => {
    setOrderedData(data);
  }, [data, setOrderedData]);

  const reorder = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      setOrderedData((draftRecords) => {
        const [record] = draftRecords.splice(sourceIndex, 1);
        draftRecords.splice(destinationIndex, 0, record as Draft<D>);

        // FIXME propper typing needed to avoid assertion
        onRowReorder(
          current(draftRecords as D[]),
          sourceIndex,
          destinationIndex
        );
      });
    },
    [setOrderedData, onRowReorder]
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

  const bodyHeight = headerBoundingRect
    ? `calc(100% - ${headerBoundingRect.height || 0}px)`
    : "100%";

  return (
    <GridProvider<D>
      instance={instance}
      components={components}
      rowDragDropEnabled={enableRowDragDrop}
      {...events}
    >
      <GridRoot {...instance.getTableProps(tableProps)}>
        <GridHeader tableHeadRef={headerRef} />
        <GridBody loading={loading} height={bodyHeight} />
      </GridRoot>
    </GridProvider>
  );
}

export default Grid;
