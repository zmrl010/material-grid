import { flexRender, Header, RowData } from "@tanstack/react-table";
import { type TableCellProps, TableSortLabel } from "@mui/material";
import { GridCell } from "./styled";

export default function GridHeaderCell<TData extends RowData>({
  header,
  ...props
}: TableCellProps & { header: Header<TData, unknown> }) {
  const sortDirection = header.column.getIsSorted() || undefined;

  return (
    <GridCell
      {...props}
      sortDirection={sortDirection}
      colSpan={header.colSpan}
      width={header.getSize()}
    >
      <TableSortLabel
        active={!!sortDirection}
        direction={sortDirection}
        onClick={header.column.getToggleSortingHandler()}
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </TableSortLabel>
    </GridCell>
  );
}
