import { flexRender, Header, RowData } from "@tanstack/react-table";
import { type TableCellProps, TableSortLabel, TableCell } from "@mui/material";

export default function GridHeaderCell<TData extends RowData>({
  header,
  ...props
}: TableCellProps & { header: Header<TData, unknown> }) {
  const sortDirection = header.column.getIsSorted() || undefined;

  return (
    <TableCell
      {...props}
      sortDirection={sortDirection}
      variant="head"
      component="div"
    >
      <TableSortLabel
        active={!!sortDirection}
        direction={sortDirection}
        hideSortIcon
        onClick={header.column.getToggleSortingHandler()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
      </TableSortLabel>
    </TableCell>
  );
}
