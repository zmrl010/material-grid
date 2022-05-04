import { TableHead, TableHeadProps, TableRow, styled } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import { useTableInstance } from "../table-context";
import { BaseType } from "../types";
import GridHeaderCell from "./GridHeaderCell";

const GridHead = forwardRef(function GridHeader<D extends BaseType = BaseType>(
  props: TableHeadProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { headerGroups } = useTableInstance<D>();

  return (
    <TableHead component="div" {...props} ref={ref}>
      {headerGroups.map((headerGroup) => (
        <TableRow
          {...headerGroup.getHeaderGroupProps()}
          key={headerGroup.id}
          component="div"
        >
          {headerGroup.headers.map((column) => (
            <GridHeaderCell
              column={column}
              {...column.getHeaderProps()}
              key={column.id}
            />
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
});

export const GridHeader = styled(GridHead, {
  name: "Grid",
  slot: "Head",
  shouldForwardProp: (prop) => prop !== "width",
})<{ width?: string | number }>(({ theme, width }) => ({
  width,
  overflowY: "auto",
  overflowX: "hidden",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
}));

export default GridHeader;
