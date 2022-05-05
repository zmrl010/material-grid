import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFlexLayout,
  type TableOptions,
  type PluginHook,
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
  /**
   * List of plugins to **replace** the default plugins passed to `useTable`
   * @default
   * - useSortBy
   * - usePagination
   * - useRowSelect
   * - useFlexLayout
   */
  plugins?: PluginHook<Record<string, unknown>>[];
}

/**
 * Default plugins passed to `useTable`
 */
const defaultPlugins = [useSortBy, usePagination, useRowSelect, useFlexLayout];

/**
 * Dynamic data table component.
 * @see https://react-table.tanstack.com/docs/overview
 */
export default function MaterialGrid(props: MaterialGridProps) {
  const {
    columns,
    data,
    options,
    plugins = defaultPlugins,
    ...tableProps
  } = props;

  const instance = useTable(
    {
      columns,
      data,
      ...options,
    },
    ...plugins
  );

  return <GridRoot instance={instance} {...tableProps} />;
}
