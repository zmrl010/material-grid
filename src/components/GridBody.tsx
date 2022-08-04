import { styled, useEventCallback } from "@mui/material";
import { flexRender, type RowData, type Table } from "@tanstack/react-table";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { COMPONENT_NAME } from "../constants";
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
  style?: CSSProperties;
}

export default function GridBody<TData extends RowData>({
  table,
  style,
}: GridBodyProps<TData>) {
  const width = table.getTotalSize();
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ height: 0, width: 0 });

  const handleResize = useEventCallback(() => {
    if (!bodyRef.current) {
      return;
    }
    setSize({
      height: bodyRef.current.clientHeight,
      width: bodyRef.current.clientWidth,
    });
  });

  useEffect(() => {
    if (!bodyRef.current) {
      return;
    }
    const observer = new ResizeObserver(() => handleResize());

    observer.observe(bodyRef.current);

    return () => observer.disconnect();
  }, [handleResize]);

  const { rowHeight } = getGridMeta(table);
  const remainingWidth = size.width - width;

  return (
    <GridBodyRoot
      style={style}
      role="rowgroup"
      className={gridClasses.body}
      ref={bodyRef}
    >
      {table.getRowModel().rows.map((row) => (
        <GridRow
          sx={{
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
          <GridCell style={{ width: remainingWidth }}></GridCell>
        </GridRow>
      ))}
    </GridBodyRoot>
  );
}
