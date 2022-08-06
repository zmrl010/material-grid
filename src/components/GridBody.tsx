import { styled } from "@mui/material";
import { type RowData, type Table } from "@tanstack/react-table";
import { useRef, type CSSProperties } from "react";
import { GRID_COMPONENT_NAME } from "../constants";
import useScrollbarWidth from "../hooks/useScrollbarWidth";
import { getGridMeta } from "../meta";
import { getBorderColor } from "../style/utils";
import { gridClasses } from "../style/gridClasses";
import GridBodyRow from "./GridBodyRow";

const GridBodyRoot = styled("div", {
  name: GRID_COMPONENT_NAME,
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
        <GridBodyRow
          key={row.id}
          rowHeight={rowHeight}
          row={row}
          remainingWidth={remainingWidth}
        />
      ))}
    </GridBodyRoot>
  );
}
