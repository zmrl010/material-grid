import { type CSSProperties, forwardRef } from "react";
import { CircularProgress, styled, TableBody, Typography } from "@mui/material";
import { useTableInstance } from "../table-context";
import GridRow from "./GridRow";
import Overlay from "./Overlay";

export interface GridBodyProps {
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
}

const GridBodyBase = forwardRef<HTMLDivElement, GridBodyProps>(
  function GridBodyBase({ loading, className, style }, ref) {
    const { rows, getTableBodyProps, prepareRow } = useTableInstance();
    const { role } = getTableBodyProps();

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
        ) : rows.length === 0 ? (
          <Overlay>
            <Typography>No data to display.</Typography>
          </Overlay>
        ) : (
          <>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <GridRow
                  {...row.getRowProps()}
                  key={row.id}
                  cells={row.cells}
                />
              );
            })}
          </>
        )}
      </TableBody>
    );
  }
);

const GridBody = styled(GridBodyBase, {
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
