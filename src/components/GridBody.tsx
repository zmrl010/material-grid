import { styled } from "@mui/material";
import { flexRender, type RowData, type Table } from "@tanstack/react-table";
import { useRef, type CSSProperties } from "react";
import { COMPONENT_NAME } from "../constants";
import useScrollbarWidth from "../hooks/useScrollbarWidth";
import { getGridMeta } from "../meta";
import getBorderColor from "../styles/getBorderColor";
import { gridClasses } from "../styles/gridClasses";
import GridBodyCell from "./GridBodyCell";
import GridCell from "./GridCell";
import GridRow from "./GridRow";

const GridBodyRoot = styled("div", {
  name: COMPONENT_NAME,
  slot: "Body",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  overflow: "auto",

  [`& .${gridClasses.cell}`]: {
    borderBottom: `1px solid ${getBorderColor(theme)}`,
  },
}));

export interface GridBodyProps<TData extends RowData> {
  table: Table<TData>;
  style?: CSSProperties & {
    height?: number | "auto";
    width?: number;
  };
}

export default function GridBody<TData extends RowData>({
  table,
  style,
}: GridBodyProps<TData>) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const scrollbarWidth = useScrollbarWidth(bodyRef);
  const { rowHeight } = getGridMeta(table);

  const remainingWidth =
    (style?.width ?? 0) - table.getTotalSize() - scrollbarWidth;

  return (
    <GridBodyRoot
      style={style}
      role="rowgroup"
      className={gridClasses.body}
      ref={bodyRef}
    >
      {table.getRowModel().rows.map((row) => (
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
      ))}
    </GridBodyRoot>
  );
}
