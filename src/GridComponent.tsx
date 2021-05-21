import {
  useTable,
  useSortBy,
  useRowSelect,
  useFlexLayout,
  usePagination,
} from "react-table";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useImmer } from "use-immer";
import {
  DraggableProvidedDragHandleProps,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { Draft, current } from "immer";
import { createStyles, makeStyles, TableProps } from "@material-ui/core";
import { GridRoot, GridHeader, GridProvider, GridBody } from "./components";
import { GridComponents, GridOptions, Id } from "./types";
import { useBoundingRect, useComponents } from "./hooks";

function defaultGetRowId<D extends Id>(row: D) {
  return row.id.toString();
}

const DRAG_HANDLE_COLUMN_ID = "drag-handle";

function createDragHandleColumn(
  components: Pick<GridComponents, "DragHandle">
) {
  return {
    id: DRAG_HANDLE_COLUMN_ID,
    Header: "",
    Cell: ({ dragHandleProps }: DragHandleCellProps) => (
      <components.DragHandle {...dragHandleProps} />
    ),
    disableSortBy: true,
    width: 25,
  };
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // boxSizing: "inherit",
    },
    container: {
      position: "relative",
    },
  })
);

export interface GridEvents<D extends Id = Id> {
  onRowReorder?: (
    data: D[],
    sourceIndex: number,
    destinationIndex: number
  ) => void;
}

type DragHandleCellProps = {
  dragHandleProps: DraggableProvidedDragHandleProps;
};

export interface GridProps<D extends Id = Id>
  extends GridOptions<D>,
    GridEvents<D>,
    TableProps {
  loading?: boolean;
  // classes?: {
  //   root: string;
  //   body?: string;
  // };
}

/**
 * Main grid component
 * @param props
 *
 * @todo implement styling overrides (classes prop) for all components
 * @todo decide on functionality for if enableRowDragDrop property change should be reflected
 */
export function Grid<D extends Id = Id>(props: GridProps<D>) {
  const {
    // required props
    columns,
    data,
    // option props
    autoResetHiddenColumns,
    components: propComponents,
    defaultCanSort = true,
    defaultColumn,
    disableSortBy = false,
    dragDropEvents = {},
    enableRowDragDrop = false, // changes in prop won't have any results
    getRowId = defaultGetRowId,
    getSubRows,
    initialState,
    loading = false,
    onRowReorder = () => {},
    stateReducer,
    useControlledState,
    ...tableProps
  } = props;

  // TODO update records from outside the component
  const [orderedData, setOrderedData] = useImmer(data);
  const components = useComponents(propComponents);

  const [headerBoundingRect, headerRef] = useBoundingRect();

  const classes = useStyles();

  // Ref to store initial value
  const enableRowDragDropRef = useRef(enableRowDragDrop);

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
      if (enableRowDragDropRef.current) {
        hooks.allColumns.push((columns) => [
          createDragHandleColumn(components),
          ...columns,
        ]);
      }
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
    // <div className={classes.container}>
    <GridProvider<D> instance={instance} components={components} {...events}>
      <GridRoot
        {...instance.getTableProps(tableProps)}
        className={classes.root}
      >
        <GridHeader<D>
          components={components}
          headerGroups={instance.headerGroups}
          tableHeadRef={headerRef}
        />
        <GridBody<D>
          isDragDisabled={!enableRowDragDropRef.current}
          rows={instance.rows}
          loading={loading}
          components={components}
          height={bodyHeight}
        />
      </GridRoot>
    </GridProvider>
    // </div>
  );
}

export default Grid;
