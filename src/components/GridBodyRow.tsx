import { flexRender, Row, type RowData } from "@tanstack/react-table";
import { memo } from "react";
import GridBodyCell from "./GridBodyCell";
import GridCell from "./GridCell";
import GridRow from "./GridRow";

function GridBodyRowRaw<TData extends RowData>({
  rowHeight,
  row,
  remainingWidth,
}: {
  rowHeight: number;
  row: Row<TData>;
  remainingWidth: number;
}): JSX.Element {
  return (
    <GridRow
      style={{
        minHeight: rowHeight,
        maxHeight: rowHeight,
      }}
      key={row.id}
    >
      {row.getVisibleCells().map((cell) => (
        <GridBodyCell
          key={cell.id}
          height={rowHeight}
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
