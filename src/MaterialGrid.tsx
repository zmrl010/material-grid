import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFlexLayout,
  type TableOptions,
} from "react-table";
import { useRef } from "react";
import { NoSsr, type TableProps } from "@mui/material";
import GridRoot from "./components/GridRoot";
import { Id } from "./types";
import { TableContext } from "./table-context";

export interface MaterialGridProps<D extends Id = Id>
  extends Pick<TableOptions<D>, "data" | "columns">,
    TableProps {
  loading?: boolean;
  options?: TableOptions<D>;
}

/**
 * Main grid component
 */
export default function MaterialGrid<D extends Id = Id>(
  props: MaterialGridProps<D>
) {
  const { columns, data, options, ...tableProps } = props;

  const rootRef = useRef<HTMLDivElement | null>(null);

  const instance = useTable<D>(
    {
      columns,
      data,
      ...options,
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
