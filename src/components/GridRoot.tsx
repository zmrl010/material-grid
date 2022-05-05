import { Table, TableBody, TableHead, type TableProps } from "@mui/material";
import { useRef } from "react";
import type { TableInstance } from "react-table";
import useBoundingRect from "../hooks/useBoundingRect";
import useScrollbarSizeDetector from "../hooks/useScrollbarSizeDetector";
import GridBodyContent from "./GridBodyContent";
import GridContainer from "./GridContainer";
import GridHeaderRow from "./GridHeaderRow";

export interface GridRootProps extends TableProps {
  loading?: boolean;
  instance: TableInstance;
}

export default function GridRoot({
  loading,
  instance,
  ...props
}: GridRootProps) {
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
            <GridHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </TableHead>
        <TableBody
          component="div"
          ref={bodyRef}
          sx={{ height: bodyHeight }}
          {...instance.getTableBodyProps()}
        >
          <GridBodyContent loading={loading} instance={instance} />
        </TableBody>
      </Table>
    </GridContainer>
  );
}
