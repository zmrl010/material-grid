import { flexRender, Header, RowData } from "@tanstack/react-table";
import { TableSortLabel } from "@mui/material";
import GridCell from "./GridCell";

export default function GridColumnHeader<TData extends RowData>({
  header,
}: {
  header: Header<TData, unknown>;
}) {
  const sortDirection = header.column.getIsSorted() || undefined;
  const width = header.getSize();

  return (
    <GridCell
      sortDirection={sortDirection}
      colSpan={header.colSpan}
      sx={{
        width,
        minWidth: width,
        maxWidth: width,
      }}
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
