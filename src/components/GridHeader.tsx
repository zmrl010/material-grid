import { TableHead, TableHeadProps, TableRow, styled } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import { useApiRef, useGridInstance } from "../api";
import { BaseType } from "../types";
import { GridHeaderCell } from "./GridHeaderCell";

// TODO pass TableHeadProps to TableHead properly
export interface GridHeaderProps extends TableHeadProps {}

type Props = GridHeaderProps;

const GridHead = forwardRef<HTMLDivElement, Props>(function GridHeader<
  D extends BaseType = BaseType
>(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  const apiRef = useApiRef<D>();
  const { headerGroups } = useGridInstance<D>(apiRef);

  return (
    <TableHead component="div" {...props} ref={ref}>
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
          {headerGroup.headers.map((column) => (
            <GridHeaderCell column={column} {...column.getHeaderProps()} />
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
});

export const GridHeader = styled(GridHead, { name: "Grid", slot: "Head" })(
  ({ theme }) => ({
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  })
);

export default GridHeader;
