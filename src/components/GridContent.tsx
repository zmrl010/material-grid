import { CircularProgress, Typography } from "@mui/material";
import { type CSSProperties } from "react";
import type { TableInstance } from "react-table";
import GridRow from "./GridRow";
import Overlay from "./Overlay";

export interface GridContentProps {
  className?: string;
  height: number | string;
  instance: TableInstance;
  loading?: boolean;
  style?: CSSProperties;
}

export default function GridContent({
  loading,
  instance,
}: Pick<GridContentProps, "loading" | "instance">) {
  if (loading) {
    return (
      <Overlay>
        <CircularProgress />
      </Overlay>
    );
  }

  if (instance.rows.length === 0) {
    return (
      <Overlay>
        <Typography>No data to display.</Typography>
      </Overlay>
    );
  }

  return (
    <>
      {instance.rows.map((row) => {
        instance.prepareRow(row);
        return (
          <GridRow {...row.getRowProps()} key={row.id} cells={row.cells} />
        );
      })}
    </>
  );
}
