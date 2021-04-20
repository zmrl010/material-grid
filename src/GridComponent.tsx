import {
  useTable,
  useSortBy,
  useRowSelect,
  useFlexLayout,
  usePagination,
} from "react-table";
import { HTMLAttributes, useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import {
  DraggableProvidedDragHandleProps,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { GridRoot, GridHeader, GridProvider, GridBody } from "./components";
import { GridOptions, IdType } from "./types";
import { useComponents } from "./hooks";
import { Draft } from "immer";

function getRowId<D extends IdType>(row: D) {
  return row.id.toString();
}

export interface GridProps<D extends IdType = IdType>
  extends GridOptions<D>,
    HTMLAttributes<HTMLTableElement> {
  loading?: boolean;
  onDataChange?: (data: D[]) => void;
}

export function Grid<D extends IdType = IdType>(props: GridProps<D>) {
  const {
    columns,
    data,
    onDataChange,
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
      // initialState: {
      //   hiddenColumns: enableRowDragDrop ? [] : ["drag-handle"],
      // },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    // TODO Does this need to be memoized?
    // TODO extract this to a hook (plugin)
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: "drag-handle",
          Header: "",
          Cell: ({
            dragHandleProps,
          }: {
            dragHandleProps: DraggableProvidedDragHandleProps;
          }) => <components.DragHandle {...dragHandleProps} />,
          disableSortBy: true,
          width: 25,
        },
        ...columns,
      ]);
    },
    useFlexLayout
  );

  const { getTableProps, headerGroups, rows } = instance;

  useEffect(() => {
    if (onDataChange) {
      onDataChange(records);
    }
  }, [records, onDataChange]);

  const reorder = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      updateRecords((draftRecords) => {
        const [record] = draftRecords.splice(sourceIndex, 1);
        draftRecords.splice(destinationIndex, 0, record as Draft<D>);
      });
    },
    [updateRecords]
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

  return (
    <GridProvider<D>
      instance={instance}
      components={components}
      rowDragDropDisabled={!enableRowDragDrop}
      {...dragDropEvents}
      onDragEnd={onDragEnd}
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
