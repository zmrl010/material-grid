import { flexRender, Header, RowData } from "@tanstack/react-table";
import { type TableCellProps, TableSortLabel } from "@mui/material";
import { GridCell } from "./styled";

export default function GridHeaderCell<TData extends RowData>({
  header,
  ...props
}: TableCellProps & { header: Header<TData, unknown> }) {
  const sortDirection = header.column.getIsSorted() || undefined;

  return (
    <GridCell {...props} sortDirection={sortDirection}>
      <TableSortLabel
        active={!!sortDirection}
        direction={sortDirection}
        hideSortIcon
        onClick={header.column.getToggleSortingHandler()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
      </TableSortLabel>
    </GridCell>
  );
}
