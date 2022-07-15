import { Table, TableHead, TableRow, type TableProps } from "@mui/material";
import { useRef } from "react";
import type { RowData, Table as TableInstance } from "@tanstack/react-table";
import useBoundingRect from "../hooks/useBoundingRect";
import useScrollbarSizeDetector from "../hooks/useScrollbarSizeDetector";
import GridBody from "./GridBody";
import GridContainer from "./GridContainer";
import GridHeaderCell from "./GridHeaderCell";

export interface GridRootProps<T extends RowData> extends TableProps {
  loading?: boolean;
  table: TableInstance<T>;
}

export default function GridRoot<TData extends RowData>({
  loading,
  table,
  ...props
}: GridRootProps<TData>) {
  const [headerBoundingRect, headerRef] = useBoundingRect();
  const bodyRef = useRef<HTMLTableSectionElement | null>(null);
  const bodyScrollbarSize = useScrollbarSizeDetector(bodyRef);
  const headerWidth = `calc(100% - ${bodyScrollbarSize}px)`;
  const bodyHeight = `calc(100% - ${headerBoundingRect?.height ?? 0}px)`;

  return (
    <GridContainer>
      <Table {...props}>
        <TableHead ref={headerRef} sx={{ width: headerWidth }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <GridHeaderCell header={header} key={header.id} />
              ))}
            </TableRow>
          ))}
        </TableHead>
        <GridBody
          bodyRef={bodyRef}
          height={bodyHeight}
          rows={table.getRowModel().rows}
          loading={loading}
        />
      </Table>
    </GridContainer>
  );
}
