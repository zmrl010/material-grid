import { CSSProperties, ForwardedRef, forwardRef, memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { styled, TableBody } from "@mui/material";
import { useForkRef } from "../hooks";
import { useTableInstance } from "../table-context";
import GridRow from "./GridRow";
import { Row } from "react-table";

import type { Id } from "../types";
import LoadingOverlay from "./LoadingOverlay";
import NoRowsOverlay from "./NoRowsOverlay";

interface GridBodyRowsProps {
  rows: Row<any>[];
  prepareRow: (row: Row<any>) => void;
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

const DroppableBody = forwardRef(function DroppableBody<D extends Id = Id>(
  { loading, className, style }: GridBodyProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const instance = useTableInstance<D>();
  const { role } = instance.getTableBodyProps();

  return (
    <Droppable droppableId="grid-body">
      {(provided) => {
        const bodyRef = useForkRef<HTMLDivElement>(ref, provided.innerRef);

        return (
          <TableBody
            component="div"
            role={role}
            className={className}
            style={style}
            ref={bodyRef}
            {...provided.droppableProps}
          >
            {loading ? (
              <LoadingOverlay />
            ) : instance.rows.length === 0 ? (
              <NoRowsOverlay />
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
