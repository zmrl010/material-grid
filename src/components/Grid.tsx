import { Box, Table, type TableProps } from "@mui/material";
import { useRef } from "react";
import type { RowData, Table as TableInstance } from "@tanstack/react-table";
import useScrollbarSizeDetector from "../hooks/useScrollbarSizeDetector";
import GridBody from "./GridBody";
import { GridMain } from "./styled";
import GridHead from "./GridHead";

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
  const headerWidth = `calc(100% - ${bodyScrollbarSize}px)`;
  const bodyHeight = `calc(100% - ${headHeight})`;

  return (
    <GridMain>
      <Table component="div" {...props}>
        <GridHead
          height={headHeight}
          width={headerWidth}
          headerGroups={table.getHeaderGroups()}
        />
        <Box overflow="visible" height={0} width={0}>
          <Box
            mt={headHeight}
            width={headerWidth}
            height={bodyHeight}
            position="relative"
            // overflow="auto"
          >
            <GridBody
              bodyRef={bodyRef}
              rows={table.getRowModel().rows}
              rowHeight={rowHeight}
              loading={loading}
            />
          </Box>
        </Box>
      </Table>
    </GridMain>
  );
}
