import { Draft } from "immer";
import { useCallback } from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import { useImmer } from "use-immer";
import { GridOptions, Id } from "../types";
import { useComponents } from "./useComponents";

function getRowId<D extends Id>(row: D) {
  return row.id.toString();
}

export function useMaterialGrid<D extends Id = Id>(options: GridOptions<D>) {
  const {
    columns,
    data,
    disableSortBy = false,
    defaultCanSort = true,
    enableRowDragDrop = false,
    components: propComponents,
    dragDropEvents = {},
    ...restOptions
  } = options;

  const [records, updateRecords] = useImmer(data);
  const components = useComponents(propComponents);

  const instance = useTable(
    {
      columns,
      data: records,
      disableSortBy,
      defaultCanSort,
      getRowId,
      initialState: {
        hiddenColumns: ["drag-handle"],
      },
      ...restOptions,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    // TODO Does this need to be memoized?
    // TODO can we extract this to a hook (plugin)?
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: "drag-handle",
          Header: "",
          Cell: components.DragHandle,
          disableSortBy: true,
        },
        ...columns,
      ]);
    }
    // useFlexLayout
  );

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

  return {
    instance,
    onDragEnd: handleDragEnd,
  };
}
