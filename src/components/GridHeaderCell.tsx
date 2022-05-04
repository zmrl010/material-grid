import type { HeaderGroup } from "react-table";
import { type TableCellProps, TableSortLabel } from "@mui/material";
import type { BaseType } from "../types";
import GridCell from "./GridCell";

function getSortDirection({
  isSorted,
  isSortedDesc,
}: Pick<HeaderGroup, "isSorted" | "isSortedDesc">) {
  if (isSorted) {
    return isSortedDesc ? "desc" : "asc";
  }
  return undefined;
}

export default function GridHeaderCell<D extends BaseType = BaseType>({
  column,
  ...props
}: TableCellProps & { column: HeaderGroup<D> }) {
  const sortDirection = getSortDirection(column);

  return (
    <GridCell
      {...props}
      sortDirection={sortDirection}
      variant="head"
      component="div"
    >
      <TableSortLabel
        active={column.canSort && column.isSorted}
        direction={sortDirection}
        hideSortIcon
        {...column.getSortByToggleProps()}
      >
        {column.render("Header")}
      </TableSortLabel>
    </GridCell>
  );
}
