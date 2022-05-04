import { type CSSProperties, forwardRef, memo } from "react";
import { CircularProgress, styled, TableBody, Typography } from "@mui/material";
import { useTableInstance } from "../table-context";
import GridRow from "./GridRow";
import Overlay from "./Overlay";
import type { Row } from "react-table";

interface GridBodyRowsProps {
  rows: Row[];
  prepareRow: (row: Row) => void;
}

export const GridBodyRows = memo(function GridBodyRows(
  props: GridBodyRowsProps
) {
  return (
    <>
      {props.rows.map((row) => {
        props.prepareRow(row);
        return (
          <GridRow {...row.getRowProps()} key={row.id} cells={row.cells} />
        );
      })}
    </>
  );
});

export interface GridBodyProps {
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
}

const GridBodyBase = forwardRef<HTMLDivElement, GridBodyProps>(
  function GridBodyBase({ loading, className, style }, ref) {
    const instance = useTableInstance();
    const { role } = instance.getTableBodyProps();

    return (
      <TableBody
        component="div"
        role={role}
        className={className}
        style={style}
        ref={ref}
      >
        {loading ? (
          <Overlay>
            <CircularProgress />
          </Overlay>
        ) : instance.rows.length === 0 ? (
          <Overlay>
            <Typography>No data to display.</Typography>
          </Overlay>
        ) : (
          <GridBodyRows rows={instance.rows} prepareRow={instance.prepareRow} />
        )}
      </TableBody>
    );
  }
);

export const GridBody = styled(GridBodyBase, {
  name: "Grid",
  slot: "Body",
  shouldForwardProp: (prop) => prop !== "height",
})<{ height?: string | number }>(({ height }) => ({
  height,
  overflowY: "auto",
  overflowX: "hidden",
  flex: 1,
  display: "block",
  position: "relative",
}));

export default GridBody;
