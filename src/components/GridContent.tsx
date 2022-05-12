import { CircularProgress, TableRowProps, Typography } from "@mui/material";
import type { Row } from "react-table";
import GridRow from "./GridRow";
import Overlay from "./Overlay";

export interface GridContentProps<T extends object> extends TableRowProps {
  loading?: boolean;
  prepareRow: (row: Row<T>) => void;
  rows: Row<T>[];
}

export default function GridContent<T extends object>({
  loading,
  rows,
  prepareRow,
}: GridContentProps<T>) {
  if (loading) {
    return (
      <Overlay>
        <CircularProgress />
      </Overlay>
    );
  }

  if (rows.length === 0) {
    return (
      <Overlay>
        <Typography>No data to display.</Typography>
      </Overlay>
    );
  }

  return (
    <>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <GridRow {...row.getRowProps()} key={row.id} cells={row.cells} />
        );
      })}
    </>
  );
}
