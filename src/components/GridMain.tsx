import { styled } from "@mui/material";
import { type RowData, type Table } from "@tanstack/react-table";
import { type JSXElementConstructor } from "react";
import { GRID_COMPONENT_NAME } from "../constants";
import { getGridMeta } from "../meta";
import { gridClasses } from "../style/gridClasses";
import GridAutoSizer from "./GridAutoSizer";
import GridBody from "./GridBody";
import { type GridColumnHeadersProps } from "./GridColumnHeaders";
import GridOverlays from "./GridOverlays";

const GridMainRoot = styled("div", {
  name: GRID_COMPONENT_NAME,
  slot: "Main",
})({
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export interface GridMainProps<TData extends RowData> {
  table: Table<TData>;
  ColumnHeaders: JSXElementConstructor<GridColumnHeadersProps<TData>>;
}

export default function GridMain<TData extends RowData>({
  table,
  ColumnHeaders,
}: GridMainProps<TData>) {
  const { rows } = table.getRowModel();
  const { headHeight = 0, loading } = getGridMeta(table);

  return (
    <GridMainRoot className={gridClasses.main}>
      <GridOverlays rows={rows} loading={loading} />
      <ColumnHeaders table={table} />
      <GridAutoSizer>
        {({ height, width }) => (
          <GridBody
            table={table}
            style={{
              width,
              height: height ? height - headHeight : "auto",
              marginTop: headHeight,
            }}
          />
        )}
      </GridAutoSizer>
    </GridMainRoot>
  );
}
