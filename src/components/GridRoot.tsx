import { useRef } from "react";
import { Table, type TableProps } from "@mui/material";
import useBoundingRect from "../hooks/useBoundingRect";
import useScrollbarSizeDetector from "../hooks/useScrollbarSizeDetector";
import GridBody from "./GridBody";
import GridHeader from "./GridHeader";
import GridContainer from "./GridContainer";
import type { TableInstance } from "react-table";

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
        <GridHeader
          headerGroups={instance.headerGroups}
          ref={headerRef}
          width={headerWidth}
        />
        <GridBody
          height={bodyHeight}
          instance={instance}
          loading={loading}
          ref={bodyRef}
        />
      </Table>
    </GridContainer>
  );
}
