import { type TableProps } from "@mui/material";
import type { RowData, Table } from "@tanstack/react-table";
import { GridRoot } from "./styled";
import GridColumnHeaders from "./columnHeaders/GridColumnHeaders";
import GridBody from "./base/GridBody";

const DEFAULT_HEAD_HEIGHT = "56px";
const DEFAULT_ROW_HEIGHT = "52px";

export interface GridProps<TData extends RowData> extends TableProps {
  /**
   * Loading state; displays a spinner if true
   */
  loading?: boolean;
  table: Table<TData>;
  headHeight?: string | number;
  rowHeight?: string | number;
}

export default function Grid<TData extends RowData>({
  loading,
  table,
  headHeight = DEFAULT_HEAD_HEIGHT,
  rowHeight = DEFAULT_ROW_HEIGHT,
  ...props
}: GridProps<TData>) {
  return (
    <GridRoot {...props}>
      <GridBody
        table={table}
        rowHeight={rowHeight}
        headHeight={headHeight}
        loading={loading}
        ColumnHeaders={GridColumnHeaders}
      />
    </GridRoot>
  );
}
