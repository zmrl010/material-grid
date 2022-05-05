import { CircularProgress, TableRowProps, Typography } from "@mui/material";
import type { Row } from "react-table";
import GridRow from "./GridRow";
import Overlay from "./Overlay";

export interface GridContentProps extends TableRowProps {
  loading?: boolean;
  prepareRow: (row: Row) => void;
  rows: Row[];
}

export default function GridContent({
  loading,
  rows,
  prepareRow,
}: GridContentProps) {
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
