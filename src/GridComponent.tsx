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
import { Draft, current } from "immer";
// import { TableContainer } from "@material-ui/core";
import { GridRoot, GridHeader, GridProvider, GridBody } from "./components";
import { GridOptions, IdType } from "./types";
import { useComponents } from "./hooks";

function getRowId<D extends IdType>(row: D) {
  return row.id.toString();
}

interface GridEvents<D extends IdType = IdType> {
  // onDataChange?: (data: D[]) => void;
  onRowReorder?: (
    data: D[],
    sourceIndex: number,
    destinationIndex: number
  ) => void;
}

type DragHandleCellProps = {
  dragHandleProps: DraggableProvidedDragHandleProps;
};

type TableAttributes = HTMLAttributes<HTMLTableElement>;

export interface GridProps<D extends IdType = IdType>
  extends GridOptions<D>,
    GridEvents<D>,
    TableAttributes {
  loading?: boolean;
}

export function Grid<D extends IdType = IdType>(props: GridProps<D>) {
  const {
    columns,
    data,
    onRowReorder = () => {},
    disableSortBy = false,
    defaultCanSort = true,
    enableRowDragDrop = false,
    loading = false,
    components: propComponents,
    dragDropEvents = {},
    ...tableProps
  } = props;

  // TODO update records from outside the component
  const [orderedData, setOrderedData] = useImmer(data);
  const components = useComponents(propComponents);

  const instance = useTable(
    {
      columns,
      data: orderedData,
      disableSortBy,
      defaultCanSort,
      getRowId,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    // TODO Does this need to be memoized?
    // TODO extract this to a hook (plugin)
    (hooks) => {
      hooks.allColumns.push((columns) =>
        enableRowDragDrop
          ? [
              {
                id: "drag-handle",
                Header: "",
                Cell: ({ dragHandleProps }: DragHandleCellProps) => (
                  <components.DragHandle {...dragHandleProps} />
                ),
                disableSortBy: true,
                width: 25,
              },
              ...columns,
            ]
          : columns
      );
    },
    useFlexLayout
  );

  useEffect(() => {
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

  return (
    <GridProvider<D>
      instance={instance}
      components={components}
      {...dragDropEvents}
      onDragEnd={onDragEnd}
    >
      {/* <TableContainer> */}
      <GridRoot {...instance.getTableProps(tableProps)}>
        <GridHeader
          components={components}
          headerGroups={instance.headerGroups}
        />
        <GridBody<D>
          isDragDisabled={!enableRowDragDrop}
          rows={instance.rows}
          loading={loading}
          components={components}
        />
      </GridRoot>
      {/* </TableContainer> */}
    </GridProvider>
  );
}

export default Grid;
