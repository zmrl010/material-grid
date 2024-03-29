import type { RowData, Table } from "@tanstack/react-table";
import { type CSSProperties } from "react";
import { getGridMeta } from "../meta";
import GridColumnHeaders from "./GridColumnHeaders";
import GridMain from "./GridMain";
import GridRoot from "./GridRoot";

export interface GridProps<TData extends RowData> {
  /**
   * React Table instance
   */
  table: Table<TData>;
  /**
   * Styles applied to root element
   */
  style?: CSSProperties;
  /**
   * Style class applied to root element
   */
  className?: string;
}

export default function Grid<TData extends RowData>({
  table,
  style,
  className,
}: GridProps<TData>) {
  const { rootRef } = getGridMeta(table);

  return (
    <GridRoot style={style} className={className} ref={rootRef}>
      <GridMain table={table} ColumnHeaders={GridColumnHeaders} />
    </GridRoot>
  );
}
