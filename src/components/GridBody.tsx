import { CSSProperties, ForwardedRef, forwardRef, useCallback } from "react";
import { Droppable } from "react-beautiful-dnd";
import { TableBody } from "@mui/material";
import clsx from "clsx";

import GridRow from "./GridRow";
import { useGetApi } from "../api";
import type { Id } from "../types";
import { setRef } from "../util";
import { classes } from "./GridRoot";

export interface GridBodyProps {
  className?: string;
  style?: CSSProperties;
  height?: string | number;
  width?: string | number;
  loading: boolean;
}

type Props = GridBodyProps;

export const GridBody = forwardRef(function GridBody<D extends Id = Id>(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { loading, className, height, width, style } = props;

  const getApi = useGetApi<D>();

  const { instance, components, hasRows } = getApi();
  const {
    className: tableBodyClassName,
    style: tableBodyStyle,
    role,
  } = instance.getTableBodyProps();

  const showNoRows = !loading && !hasRows();

  return (
    <Droppable droppableId="table-body">
      {(provided) => {
        /**
         * Set both the passed ref from outside the component
         * and the provided ref from the droppable callback
         */
        const bodyRef = useCallback((instance: HTMLDivElement | null) => {
          setRef(ref, instance);
          setRef(provided.innerRef, instance);
        }, []);

        return (
          <TableBody
            component={"div"}
            role={role}
            className={clsx(classes.body, className, tableBodyClassName)}
            style={{ ...style, ...tableBodyStyle, height, width }}
            ref={bodyRef}
            {...provided.droppableProps}
          >
            {showNoRows ? (
              <components.NoRowsOverlay />
            ) : loading ? (
              <components.LoadingOverlay />
            ) : (
              instance.rows.map((row) => {
                instance.prepareRow(row);
                return (
                  <GridRow
                    {...row.getRowProps()}
                    dragDropEnabled={row.dragDropEnabled}
                    id={row.id}
                    index={row.index}
                    cells={row.cells}
                  />
                );
              })
            )}
          </TableBody>
        );
      }}
    </Droppable>
  );
});

export default GridBody;
