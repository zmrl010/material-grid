import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  type TableProps,
} from "@mui/material";
import { useRef } from "react";
import type { TableInstance } from "react-table";
import useBoundingRect from "../hooks/useBoundingRect";
import useScrollbarSizeDetector from "../hooks/useScrollbarSizeDetector";
import GridContent from "./GridContent";
import GridContainer from "./GridContainer";
import GridHeaderCell from "./GridHeaderCell";

export interface GridRootProps<T extends object> extends TableProps {
  loading?: boolean;
  instance: TableInstance<T>;
}

export default function GridRoot<T extends object>({
  loading,
  instance,
  ...props
}: GridRootProps<T>) {
  const [headerBoundingRect, headerRef] = useBoundingRect();
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const scrollbarSize = useScrollbarSizeDetector(bodyRef);

  const headerWidth = `calc(100% - ${scrollbarSize}px)`;
  const headerHeight = headerBoundingRect?.height ?? 0;
  const bodyHeight = `calc(100% - ${headerHeight}px)`;

  return (
    <GridContainer>
      <Table tabIndex={0} component="div" {...props}>
        <TableHead component="div" ref={headerRef} sx={{ width: headerWidth }}>
          {instance.headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id} component="div">
              {headerGroup.headers.map((column) => (
                <GridHeaderCell column={column} key={column.id} />
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody
          component="div"
          ref={bodyRef}
          sx={{ height: bodyHeight }}
          {...instance.getTableBodyProps()}
        >
          <GridContent
            loading={loading}
            rows={instance.rows}
            prepareRow={instance.prepareRow}
          />
        </TableBody>
      </Table>
    </GridContainer>
  );
}
