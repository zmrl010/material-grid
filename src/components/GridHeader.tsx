import { TableHead, TableHeadProps, TableRow, styled } from "@mui/material";
import { forwardRef } from "react";
import { useTableInstance } from "../table-context";
import GridHeaderCell from "./GridHeaderCell";

const GridHead = forwardRef<HTMLDivElement, TableHeadProps>(function GridHeader(
  props,
  ref
) {
  const { headerGroups } = useTableInstance();

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

const GridHeader = styled(GridHead, {
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
