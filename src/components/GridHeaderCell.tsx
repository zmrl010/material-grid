import type { HeaderGroup } from "react-table";
import { type TableCellProps, TableSortLabel, TableCell } from "@mui/material";

function getSortDirection({
  isSorted,
  isSortedDesc,
}: Pick<HeaderGroup, "isSorted" | "isSortedDesc">) {
  if (isSorted) {
    return isSortedDesc ? "desc" : "asc";
  }
  return undefined;
}

export default function GridHeaderCell({
  column,
  ...props
}: TableCellProps & { column: HeaderGroup }) {
  const sortDirection = getSortDirection(column);

  return (
    <TableCell
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
    </TableCell>
  );
}
