import { type TableProps } from "@mui/material";
import { useRef } from "react";
import type { RowData, Table as TableInstance } from "@tanstack/react-table";
import useScrollbarSizeDetector from "../hooks/useScrollbarSizeDetector";
import { GridRoot, GridMainContainer } from "./styled";
import GridColumnHeaders from "./columnHeaders/GridColumnHeaders";
import GridBody from "./base/GridBody";

const DEFAULT_HEAD_HEIGHT = "56px";
const DEFAULT_ROW_HEIGHT = "52px";

export interface GridProps<T extends RowData> extends TableProps {
  /**
   * Loading state; displays a spinner if true
   */
  loading?: boolean;
  table: TableInstance<T>;
  headHeight?: string | number;
  rowHeight?: string | number;
}

export default function Grid<TData extends RowData>({
  loading,
  table,
  headHeight = DEFAULT_HEAD_HEIGHT,
  rowHeight = DEFAULT_ROW_HEIGHT,
  ...props
}: GridProps<TData>) {
  const bodyRef = useRef<HTMLTableSectionElement | null>(null);
  const bodyScrollbarSize = useScrollbarSizeDetector(bodyRef);
  const headWidth = `calc(100% - ${bodyScrollbarSize}px)`;
  // const bodyHeight = `calc(100% - ${headHeight})`;

  return (
    <GridRoot {...props}>
      <GridMainContainer>
        <GridColumnHeaders
          height={headHeight}
          width={headWidth}
          headerGroups={table.getHeaderGroups()}
        />
        <GridBody
          rows={table.getRowModel().rows}
          rowHeight={rowHeight}
          loading={loading}
          bodyRef={bodyRef}
        />
        {/* <Box overflow="visible" height={0} width={0}>
          <Box
            mt={headHeight}
            width={headWidth}
            height={bodyHeight}
            position="relative"
          >
            <GridMain
              rows={table.getRowModel().rows}
              rowHeight={rowHeight}
              loading={loading}
            />
          </Box>
        </Box> */}
      </GridMainContainer>
    </GridRoot>
  );
}
