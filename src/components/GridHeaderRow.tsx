import { TableRow } from "@mui/material";
import type { HeaderGroup } from "react-table";
import GridHeaderCell from "./GridHeaderCell";

interface GridHeaderRowProps {
  headerGroup: HeaderGroup;
}

export default function GridHeaderRow({ headerGroup }: GridHeaderRowProps) {
  return (
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
  );
}
