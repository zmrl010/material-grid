import {
  Column,
  useTable,
  useSortBy,
  useRowSelect,
  // useFlexLayout,
  usePagination,
} from "react-table";
import { HTMLAttributes, useCallback } from "react";
import { useImmer } from "use-immer";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { GridRoot, GridHeader, GridProvider, GridBody } from "./components";
import { DragEventMap, GridComponents, IdType } from "./types";
import { useComponents } from "./hooks";
import { Draft } from "immer";

function getRowId<D extends IdType>(row: D) {
  return row.id.toString();
}

export interface DataTableOptions<D extends IdType = IdType> {
  columns: Column<D>[];
  data: D[];
  disableSortBy?: boolean;
  defaultCanSort?: boolean;
  // TODO conditional disableRowDragDrop based on defaultCanSort
  // TODO make error if both are set the same
  // disableRowDragDrop?: boolean;
  enableRowDragDrop?: boolean;
  components?: GridComponents;
  dragDropEvents?: Partial<DragEventMap>;
}

export interface GridProps<D extends IdType = IdType>
  extends DataTableOptions<D>,
    HTMLAttributes<HTMLTableElement> {
  loading?: boolean;
}

export function Grid<D extends IdType = IdType>(props: GridProps<D>) {
  const {
    columns,
    data,
    disableSortBy = false,
    defaultCanSort = true,
    enableRowDragDrop = false,
    loading = false,
    components: propComponents,
    dragDropEvents = {},
    ...tableProps
  } = props;

  // TODO update records from outside the component
  const [records, updateRecords] = useImmer(data);
  const components = useComponents(propComponents);
  const instance = useTable(
    {
      columns,
      data: records,
      disableSortBy,
      defaultCanSort,
      getRowId,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    // TODO Does this need to be memoized?
    // TODO can we extract this to a hook (plugin)?
    (hooks) => {
      hooks.allColumns.push((columns) =>
        enableRowDragDrop
          ? [
              {
                id: "drag-handle",
                Header: "",
                Cell: components.DragHandle,
                disableSortBy: true,
              },
              ...columns,
            ]
          : columns
      );
    }
    // useFlexLayout
  );

  const { getTableProps, headerGroups, rows } = instance;

  const moveRow = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      updateRecords((draftRecords) => {
        const [record] = draftRecords.splice(sourceIndex, 1);
        draftRecords.splice(destinationIndex, 0, record as Draft<D>);
      });
    },
    [updateRecords]
  );

  const handleDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      if (result.destination) {
        moveRow(result.source.index, result.destination.index);
      }
      dragDropEvents.onDragEnd?.(result, provided);
    },
    [moveRow, dragDropEvents.onDragEnd]
  );

  return (
    <GridProvider<D>
      instance={instance}
      components={components}
      rowDragDropDisabled={!enableRowDragDrop}
      onDragEnd={handleDragEnd}
      {...dragDropEvents}
    >
      <GridRoot {...getTableProps(tableProps)}>
        <GridHeader components={components} headerGroups={headerGroups} />
        <GridBody<D>
          showNoRows={!loading && rows.length === 0}
          isDragDisabled={!enableRowDragDrop}
          rows={rows}
          loading={loading}
          NoRowsOverlay={components.NoRowsOverlay}
          LoadingOverlay={components.LoadingOverlay}
        />
      </GridRoot>
    </GridProvider>
  );
}

export default Grid;
