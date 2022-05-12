import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFlexLayout,
  type TableOptions,
} from "react-table";
import { type TableProps } from "@mui/material";
import GridRoot from "./components/GridRoot";

export interface MaterialGridProps<T extends object>
  extends Pick<TableOptions<T>, "data" | "columns">,
    TableProps {
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Additional options passed to `useTable`
   */
  options?: TableOptions<T>;
}

/**
 * Dynamic data table component.
 * @see https://react-table.tanstack.com/docs/overview
 */
export default function MaterialGrid<T extends object>(
  props: MaterialGridProps<T>
) {
  const { columns, data, options, ...tableProps } = props;

  const instance = useTable(
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

  return <GridRoot instance={instance} {...tableProps} />;
}
