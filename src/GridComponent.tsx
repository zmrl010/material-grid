import {
  Column,
  useTable,
  useSortBy,
  useRowSelect,
  useFlexLayout,
  usePagination,
} from "react-table";
import { HTMLAttributes, useCallback } from "react";
import { useImmer } from "use-immer";
import { DropResult } from "react-beautiful-dnd";
import { GridRoot } from "./components";
import { GridComponents, IdType } from "./types";
import { useComponents } from "./hooks";
import GridHeader from "./components/GridHeader";
import GridProvider from "./components/GridProvider";
import GridBody from "./components/GridBody";

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
    ...tableProps
  } = props;

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
    useFlexLayout
  );

  const { getTableProps, headerGroups, rows } = instance;

  const moveRow = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      updateRecords((draftRecords) => {
        const [record] = draftRecords.splice(sourceIndex, 1);
        // FIXME record type
        draftRecords.splice(destinationIndex, 0, record as any);
      });
    },
    [updateRecords]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.destination) {
        moveRow(result.source.index, result.destination.index);
      }
    },
    [moveRow]
  );

  return (
    <GridProvider<D>
      onDragEnd={onDragEnd}
      instance={instance}
      components={components}
      rowDragDropDisabled={!enableRowDragDrop}
    >
      <GridRoot {...getTableProps()} {...tableProps}>
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
