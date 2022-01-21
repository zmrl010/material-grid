import { useCallback, useRef } from "react";
import { useImmer } from "use-immer";
import { Draft, current } from "immer";
import { Id, RowReorderEvent } from "../types";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

/**
 * Stores row data and provide function to move a row to a different index
 */
export function useOrderedRows<D extends Id = Id>(
  rows: D[],
  onRowReorder?: RowReorderEvent<D>
) {
  const [orderedRows, setOrderedRows] = useImmer(rows);

  // effect to "reset" rows when data changes
  const prevRows = useRef(rows);
  useIsomorphicEffect(() => {
    if (prevRows.current !== rows) {
      setOrderedRows(rows);
      prevRows.current = rows;
    }
  }, [rows]);

  const moveRow = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      setOrderedRows((draftRecords) => {
        const [record] = draftRecords.splice(sourceIndex, 1);
        draftRecords.splice(destinationIndex, 0, record as Draft<D>);

        // FIXME proper typing needed to avoid assertion
        onRowReorder?.(
          current(draftRecords) as D[],
          sourceIndex,
          destinationIndex
        );
      });
    },
    [onRowReorder]
  );

  return [orderedRows, moveRow] as const;
}
