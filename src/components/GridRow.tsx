import { TableCell, TableRow, type TableRowProps } from "@mui/material";
import type { Cell } from "react-table";

export default function GridRow({
  cells,
  ...rowProps
}: TableRowProps & { cells: Cell[] }) {
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
