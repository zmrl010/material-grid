import { type StyledComponent } from "@emotion/styled";
import { styled, TableHead, type TableHeadProps } from "@mui/material";
import type { RowData, Table } from "@tanstack/react-table";
import { forwardRef, type ComponentPropsWithRef } from "react";
import { COMPONENT_NAME } from "../constants";
import getBorderColor from "../styles/getBorderColor";
import GridColumnHeader from "./GridColumnHeader";
import GridRow from "./GridRow";

const GridHeadRootBase = forwardRef<HTMLDivElement, TableHeadProps>(
  function GridHead(props, ref) {
    return <TableHead component="div" {...props} ref={ref} />;
  }
);

const GridHeadRoot: StyledComponent<ComponentPropsWithRef<"div">> = styled(
  GridHeadRootBase,
  {
    name: COMPONENT_NAME,
    slot: "Head",
  }
)(({ theme }) => ({
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

export default function GridColumnHeaders<TData extends RowData>({
  table,
}: GridColumnHeadersProps<TData>) {
  const { headHeight: height } = table.options.meta ?? {};

  return (
    <GridHeadRoot
      style={{
        width: "100%",
        minHeight: height,
        maxHeight: height,
        lineHeight: height,
      }}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <GridRow
          key={headerGroup.id}
          sx={{ minHeight: height, maxHeight: height }}
        >
          {headerGroup.headers.map((header) => (
            <GridColumnHeader header={header} key={header.id} />
          ))}
        </GridRow>
      ))}
    </GridHeadRoot>
  );
}
