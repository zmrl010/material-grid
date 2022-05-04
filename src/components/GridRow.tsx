import { TableRow, type TableRowProps } from "@mui/material";
import type { Cell } from "react-table";
import type { BaseType } from "../types";
import GridCell from "./GridCell";

export default function GridRow<D extends BaseType = BaseType>({
  cells,
  ...rowProps
}: TableRowProps & { cells: Cell<D>[] }) {
  return (
    <TableRow
      component="div"
      sx={{ bgcolor: "background.paper" }}
      {...rowProps}
    >
      {cells.map((cell) => (
        <GridCell
          {...cell.getCellProps()}
          key={cell.column.id}
          variant="body"
          component="div"
        >
          {cell.render("Cell")}
        </GridCell>
      ))}
    </TableRow>
  );
}
