import { TableHead, TableHeadProps, TableRow } from "@mui/material";
import clsx from "clsx";
import { ForwardedRef, forwardRef } from "react";
import { useGetApi } from "../api";
import { BaseType } from "../types";
import { GridHeaderCell } from "./GridHeaderCell";

// TODO pass TableHeadProps to TableHead properly
export interface GridHeaderProps extends TableHeadProps {
  width?: string | number;
}

type Props = GridHeaderProps;

export const GridHeader = forwardRef<HTMLDivElement, Props>(function GridHeader<
  D extends BaseType = BaseType
>(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  const { className, style, width, ...gridHeadProps } = props;

  const getApi = useGetApi<D>();

  const { headerGroups } = getApi().instance;

  return (
    <TableHead
      {...gridHeadProps}
      className={clsx("Grid-head", className)}
      style={{ ...style, width }}
      component="div"
      ref={ref}
    >
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

export default GridHeader;
