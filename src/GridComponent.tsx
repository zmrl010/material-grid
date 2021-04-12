import {
  Column,
  useTable,
  useSortBy,
  useRowSelect,
  useFlexLayout,
  usePagination,
} from "react-table";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { HTMLAttributes, useCallback } from "react";
import { useImmer } from "use-immer";
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "react-beautiful-dnd";
import { GridComponents, GridRoot } from "./components";
import { useComponents } from "./hooks";
import DragHandle from "./components/DragHandle";
import GridHeader from "./components/GridHeader";
import { Draft, castDraft } from "immer";

function getRowId<D extends { id: number | string }>(row: D) {
  return row.id.toString();
}

export interface DataTableOptions<D extends { id: number } = { id: number }> {
  columns: Column<D>[];
  data: D[];
  disableSortBy?: boolean;
  defaultCanSort?: boolean;
  // TODO conditional disableRowDragDrop based on defaultCanSort
  // TODO make error if both are set the same
  disableRowDragDrop?: boolean;
  components?: GridComponents;
}

export interface GridProps<D extends { id: number } = { id: number }>
  extends DataTableOptions<D>,
    HTMLAttributes<HTMLTableElement> {
  loading?: boolean;
}

export function Grid<D extends { id: number } = { id: number }>(
  props: GridProps<D>
) {
  const {
    columns,
    data,
    disableSortBy = false,
    defaultCanSort = true,
    disableRowDragDrop = false,
    loading = false,
    components: propComponents,
    ...tableProps
  } = props;

  const [records, updateRecords] = useImmer(data);
  const components = useComponents(propComponents);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
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

  const showNoRows = !loading && rows.length === 0;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <GridRoot {...getTableProps()} {...tableProps}>
        <GridHeader components={components} headerGroups={headerGroups} />
        <Droppable droppableId="droppable-table">
          {(provided) => (
            <TableBody
              {...getTableBodyProps()}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {showNoRows && <components.NoRowsOverlay />}
              {loading && <components.LoadingOverlay />}
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <Draggable
                    key={row.id}
                    draggableId={row.id}
                    index={i}
                    isDragDisabled={disableRowDragDrop}
                  >
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...row.getRowProps({ ...provided.draggableProps })}
                      >
                        <div style={{ position: "relative" }}>
                          {!disableRowDragDrop && (
                            <DragHandle {...provided.dragHandleProps} />
                          )}
                          {row.cells.map((cell) => (
                            <TableCell {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </TableCell>
                          ))}
                        </div>
                      </TableRow>
                    )}
                  </Draggable>
                );
              })}
            </TableBody>
          )}
        </Droppable>
      </GridRoot>
    </DragDropContext>
  );
}

export default Grid;
