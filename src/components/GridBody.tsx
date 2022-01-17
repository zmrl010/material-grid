import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  useCallback,
  memo,
} from "react";
import { Droppable } from "react-beautiful-dnd";
import { styled, TableBody } from "@mui/material";
import GridRow from "./GridRow";
import { useApiContext, useGridApi } from "../api";
import { setRef } from "../util";
import { Row } from "react-table";

import type { Id } from "../types";

export interface GridBodyProps {
  className?: string;
  style?: CSSProperties;
  loading: boolean;
}

type Props = GridBodyProps;

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

const DroppableBody = forwardRef(function DroppableBody<D extends Id = Id>(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { loading, className, style } = props;

  const apiRef = useApiContext<D>();
  const {
    instance,
    components: { LoadingOverlay, NoRowsOverlay },
    hasRows,
  } = useGridApi(apiRef);
  const { role } = instance.getTableBodyProps();

  return (
    <Droppable droppableId="grid-body">
      {(provided) => {
        /**
         * Set both the passed ref from outside the component
         * and the provided ref from the droppable callback
         */
        const bodyRef = useCallback((element: HTMLDivElement | null) => {
          setRef(ref, element);
          setRef(provided.innerRef, element);
        }, []);

        return (
          <TableBody
            component={"div"}
            role={role}
            className={className}
            style={style}
            ref={bodyRef}
            {...provided.droppableProps}
          >
            {loading ? (
              <LoadingOverlay />
            ) : !hasRows() ? (
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

export const GridBody = styled(DroppableBody, { name: "Grid", slot: "Body" })({
  overflowY: "auto",
  overflowX: "hidden",
  flex: 1,
  display: "block",
  position: "relative",
});

export default GridBody;
