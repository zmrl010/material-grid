import { CircularProgress, TableBody, Typography } from "@mui/material";
import { forwardRef, type CSSProperties } from "react";
import type { TableInstance } from "react-table";
import GridRow from "./GridRow";
import Overlay from "./Overlay";

export interface GridBodyProps {
  className?: string;
  height: number | string;
  instance: TableInstance;
  loading?: boolean;
  style?: CSSProperties;
}

function GridBodyContent({
  loading,
  instance,
}: Pick<GridBodyProps, "loading" | "instance">) {
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

const GridBody = forwardRef<HTMLDivElement, GridBodyProps>(function GridBody(
  { loading, height, instance, ...props },
  ref
) {
  const { role } = instance.getTableBodyProps();

  return (
    <TableBody component="div" role={role} ref={ref} sx={{ height }} {...props}>
      <GridBodyContent loading={loading} instance={instance} />
    </TableBody>
  );
});

export default GridBody;
