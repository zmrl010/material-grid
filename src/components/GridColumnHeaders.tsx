import { styled } from "@mui/material";
import type { RowData, Table } from "@tanstack/react-table";
import { useRef } from "react";
import { GRID_COMPONENT_NAME } from "../constants";
import useIsoLayoutEffect from "../hooks/useIsoLayoutEffect";
import useScrollbarSize from "../hooks/useScrollbarSize";
import { getGridMeta } from "../meta";
import { gridClasses } from "../style/gridClasses";
import { getBorderColor } from "../style/styleUtil";
import GridColumnHeader from "./GridColumnHeader";
import GridRow from "./GridRow";

const GridHead = styled("div", {
  name: GRID_COMPONENT_NAME,
  slot: "Head",
})(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottom: `1px solid ${getBorderColor(theme)}`,
}));

export interface GridColumnHeadersProps<TData extends RowData> {
  table: Table<TData>;
}

function Spacer() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollbarSize = useScrollbarSize(ref.current);

  return (
    <div
      ref={ref}
      style={{
        minWidth: scrollbarSize,
        maxWidth: scrollbarSize,
      }}
    />
  );
}

export default function GridColumnHeaders<TData extends RowData>({
  table,
}: GridColumnHeadersProps<TData>) {
  const { headHeight, headRef, bodyRef } = getGridMeta(table);

  useIsoLayoutEffect(() => {
    if (headRef.current && bodyRef.current) {
      headRef.current.scrollLeft = bodyRef.current.scrollLeft;
    }
  });

  return (
    <GridHead
      ref={headRef}
      className={gridClasses.columnHeaders}
      style={{
        width: "100%",
        minHeight: headHeight,
        maxHeight: headHeight,
        lineHeight: headHeight,
      }}
      role="rowgroup"
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <GridRow
          key={headerGroup.id}
          style={{
            minHeight: headHeight,
            maxHeight: headHeight,
          }}
        >
          {headerGroup.headers.map((header) => (
            <GridColumnHeader header={header} key={header.id} />
          ))}
          <Spacer />
        </GridRow>
      ))}
    </GridHead>
  );
}
