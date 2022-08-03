import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";

export interface GridMeta {
  /**
   * Height of column headers
   * @default
   * 56
   */
  headHeight?: number;
  /**
   * Height of body rows
   * @default
   * 52
   */
  rowHeight?: number;
  /**
   * Loading state; displays a spinner if true
   */
  loading?: boolean;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  interface TableMeta<TData extends RowData> extends GridMeta {}
}
