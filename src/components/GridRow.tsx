import { TableCell, TableRow, type TableRowProps } from "@mui/material";
import type { Cell } from "react-table";

export default function GridRow<T extends object>({
  cells,
  ...rowProps
}: TableRowProps & { cells: Cell<T>[] }) {
  return (
    <TableRow component="div" {...rowProps}>
      {cells.map((cell) => (
        <TableCell
          {...cell.getCellProps()}
          key={cell.column.id}
          variant="body"
          component="div"
        >
          {cell.render("Cell")}
        </TableCell>
      ))}
    </TableRow>
  );
}
