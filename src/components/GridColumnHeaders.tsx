import { styled } from "@mui/material";
import type { RowData, Table } from "@tanstack/react-table";
import { GRID_COMPONENT_NAME } from "../constants";
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

function Spacer({ width }: { width: number }) {
  return (
    <div
      style={{
        minWidth: width,
        maxWidth: width,
      }}
    ></div>
  );
}

export default function GridColumnHeaders<TData extends RowData>({
  table,
}: GridColumnHeadersProps<TData>) {
  const { headHeight, headRef } = getGridMeta(table);

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
          style={{ minHeight: headHeight, maxHeight: headHeight }}
        >
          {headerGroup.headers.map((header) => (
            <GridColumnHeader header={header} key={header.id} />
          ))}
          <Spacer width={32} />
        </GridRow>
      ))}
    </GridHead>
  );
}
