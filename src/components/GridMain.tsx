import { styled } from "@mui/material";
import { type Table, type RowData } from "@tanstack/react-table";
import { ComponentPropsWithoutRef, type JSXElementConstructor } from "react";
import GridOverlays from "./GridOverlays";
import { GridColumnHeadersProps } from "./GridColumnHeaders";
import GridAutoSizer from "./GridAutoSizer";
import GridBody from "./GridBody";
import type { StyledComponent } from "@emotion/styled";
import { COMPONENT_NAME } from "../constants";

const GridMainContainer: StyledComponent<ComponentPropsWithoutRef<"div">> =
  styled("div", {
    name: COMPONENT_NAME,
    slot: "Main",
  })(() => ({
    position: "relative",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  }));

export interface GridMainProps<TData extends RowData> {
  table: Table<TData>;
  loading?: boolean;
  headHeight: number;
  rowHeight: number;
  ColumnHeaders: JSXElementConstructor<GridColumnHeadersProps<TData>>;
}

export default function GridMain<TData extends RowData>({
  table,
  loading,
  headHeight,
  rowHeight,
  ColumnHeaders,
}: GridMainProps<TData>) {
  const { rows } = table.getRowModel();

  return (
    <GridMainContainer>
      <GridOverlays loading={loading} rows={rows} />
      <ColumnHeaders table={table} height={headHeight} width="100%" />
      <GridAutoSizer>
        {({ height, width }) => (
          <GridBody
            table={table}
            rowHeight={rowHeight}
            style={{
              width,
              height: height ? height - headHeight : "auto",
              marginTop: headHeight,
            }}
          />
        )}
      </GridAutoSizer>
    </GridMainContainer>
  );
}
