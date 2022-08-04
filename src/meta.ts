import "@tanstack/react-table";
import { RowData, Table } from "@tanstack/react-table";
import { Ref } from "react";

/**
 * Extended properties on `table.options.meta`
 */
export interface GridMeta {
  /**
   * Height of column headers
   * @default
   * 56
   */
  headHeight: number;
  /**
   * Height of body rows
   * @default
   * 52
   */
  rowHeight: number;
  /**
   * Loading state; displays a spinner if true
   */
  loading: boolean;
  /**
   * Grid root DOM element ref
   */
  rootRef: Ref<HTMLDivElement>;
  /**
   * Total grid size { height, width }
   */
  size: { height: number; width: number };
}

export const defaultMeta: GridMeta = {
  headHeight: 56,
  rowHeight: 52,
  loading: false,
  rootRef: { current: null },
  size: { height: 0, width: 0 },
};

/**
 * Extract grid meta data from table instance.
 *
 * *Throws if meta hasn't been initialized yet*
 */
export function getGridMeta<TData extends RowData>(
  table: Table<TData>
): GridMeta {
  const { meta } = table.options;

  if (!meta) {
    throw new Error("Grid meta has not been set.");
  }

  return meta;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  interface TableMeta<TData extends RowData> extends GridMeta {}
}
