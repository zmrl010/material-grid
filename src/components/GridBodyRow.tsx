import { flexRender, Row, type RowData } from "@tanstack/react-table";
import { memo } from "react";
import GridBodyCell from "./GridBodyCell";
import GridCell from "./GridCell";
import GridRow from "./GridRow";

export interface GridBodyRowProps<TData extends RowData> {
  height: number;
  remainingWidth: number;
  row: Row<TData>;
}

function GridBodyRowRaw<TData extends RowData>({
  height,
  row,
  remainingWidth,
}: GridBodyRowProps<TData>): JSX.Element {
  return (
    <GridRow
      style={{
        minHeight: height,
        maxHeight: height,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <GridBodyCell
          key={cell.id}
          height={height}
          width={cell.column.getSize()}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </GridBodyCell>
      ))}
      {remainingWidth > 0 && (
        <GridCell style={{ width: remainingWidth }}></GridCell>
      )}
    </GridRow>
  );
}

export default memo(GridBodyRowRaw) as typeof GridBodyRowRaw;
