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

export interface MaterialGridProps
  extends Pick<TableOptions, "data" | "columns">,
    TableProps {
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Additional options passed to `useTable`
   */
  options?: TableOptions;
}

/**
 * Dynamic data table component.
 * @see https://react-table.tanstack.com/docs/overview
 */
export default function MaterialGrid(props: MaterialGridProps) {
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
