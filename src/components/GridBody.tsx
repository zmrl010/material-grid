import { styled, useEventCallback } from "@mui/material";
import { type RowData, type Table } from "@tanstack/react-table";
import { type UIEvent, type CSSProperties } from "react";
import { GRID_COMPONENT_NAME } from "../constants";
import { getGridMeta } from "../meta";
import { getBorderColor } from "../style/styleUtil";
import { gridClasses } from "../style/gridClasses";
import useElementSize from "../hooks/useElementSize";
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
  style?: CSSProperties;
}

export default function GridBody<TData extends RowData>({
  table,
  style,
}: GridBodyProps<TData>) {
  const { rowHeight, bodyRef, headRef } = getGridMeta(table);
  const { clientWidth } = useElementSize(bodyRef);

  const remainingWidth = clientWidth - table.getTotalSize();

  const handleScroll = useEventCallback((e: UIEvent) => {
    if (headRef.current) {
      headRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  });

  return (
    <GridBodyRoot
      style={style}
      role="rowgroup"
      className={gridClasses.body}
      onScroll={handleScroll}
      ref={bodyRef}
    >
      {table.getRowModel().rows.map((row) => (
        <GridBodyRow
          key={row.id}
          height={rowHeight}
          row={row}
          remainingWidth={remainingWidth}
        />
      ))}
    </GridBodyRoot>
  );
}
