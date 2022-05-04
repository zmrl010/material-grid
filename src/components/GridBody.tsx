import { CSSProperties, ForwardedRef, forwardRef, memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { CircularProgress, styled, TableBody, Typography } from "@mui/material";
import { useTableInstance } from "../table-context";
import GridRow from "./GridRow";
import Overlay from "./Overlay";
import type { Row } from "react-table";
import type { Id } from "../types";
import { setRef } from "../util";

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
          <GridRow
            {...row.getRowProps()}
            key={row.id}
            dragDropEnabled={row.dragDropEnabled}
            id={row.id}
            index={row.index}
            cells={row.cells}
          />
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

const DroppableBody = forwardRef(function DroppableBody(
  { loading, className, style }: GridBodyProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const instance = useTableInstance();
  const { role } = instance.getTableBodyProps();

  return (
    <Droppable droppableId="grid-body">
      {(provided) => {
        return (
          <TableBody
            component="div"
            role={role}
            className={className}
            style={style}
            ref={(element: HTMLDivElement) => {
              setRef(ref, element);
              setRef(provided.innerRef, element);
            }}
            {...provided.droppableProps}
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
              <GridBodyRows
                rows={instance.rows}
                prepareRow={instance.prepareRow}
              />
            )}
            {provided.placeholder}
          </TableBody>
        );
      }}
    </Droppable>
  );
});

export const GridBody = styled(DroppableBody, {
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
