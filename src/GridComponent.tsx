import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFlexLayout,
  TableOptions,
} from "react-table";
import { useRef } from "react";
import { NoSsr, TableProps } from "@mui/material";
import { GridRoot } from "./components";
import { Id } from "./types";
import { TableContext } from "./table-context";

function defaultGetRowId<D extends Id>(row: D) {
  return row.id.toString();
}

export interface GridProps<D extends Id = Id>
  extends TableOptions<D>,
    TableProps {
  loading?: boolean;
}

/**
 * Main grid component
 */
export function Grid<D extends Id = Id>(props: GridProps<D>) {
  const {
    columns,
    data,
    defaultCanSort = false,
    disableSortBy = false,
    getRowId = defaultGetRowId,
    ...tableProps
  } = props;

  const rootRef = useRef<HTMLDivElement | null>(null);

  const instance = useTable<D>(
    {
      columns,
      data,
      disableSortBy,
      defaultCanSort,
      getRowId,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    useFlexLayout
  );

  return (
    <TableContext.Provider value={instance}>
      <NoSsr>
        <GridRoot {...instance.getTableProps()} {...tableProps} ref={rootRef} />
      </NoSsr>
    </TableContext.Provider>
  );
}

export default Grid;
