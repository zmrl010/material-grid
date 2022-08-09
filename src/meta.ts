import { type RowData, type Table } from "@tanstack/react-table";
import { MutableRefObject } from "react";

/**
 * Extended properties on `table.options.meta`
 */
export interface GridMeta {
  /**
   * Height of column headers
   * @default
   * 56
   */
  readonly headHeight: number;
  /**
   * Height of body rows
   * @default
   * 52
   */
  readonly rowHeight: number;
  /**
   * Loading state; displays a spinner if true
   */
  readonly loading?: boolean;
  /**
   * Grid root element ref
   */
  readonly rootRef: MutableRefObject<HTMLDivElement | null>;
  /**
   * Grid head root element ref
   */
  readonly headRef: MutableRefObject<HTMLDivElement | null>;
  /**
   * Grid body root element ref
   */
  readonly bodyRef: MutableRefObject<HTMLDivElement | null>;
}

export type GridMetaProps = Pick<GridMeta, "loading">;

export const defaultMeta: GridMeta = {
  headHeight: 56,
  rowHeight: 52,
  loading: false,
  rootRef: { current: null },
  headRef: { current: null },
  bodyRef: { current: null },
};

/**
 * Extract grid meta data from table instance.
 *
 * *Throws exception if meta hasn't been initialized*
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
