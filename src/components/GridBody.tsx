import { CSSProperties, ForwardedRef, forwardRef, useCallback } from "react";
import { Droppable } from "react-beautiful-dnd";
import { TableBody } from "@material-ui/core";
import clsx from "clsx";

import GridRow from "./GridRow";
import { useGetApi } from "../api";
import type { Id } from "../types";

export interface GridBodyProps {
  className?: string;
  style?: CSSProperties;
  height?: string | number;
  loading: boolean;
}

type Props = GridBodyProps;

export const GridBody = forwardRef(function GridBody<D extends Id = Id>(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { loading, className, height, style } = props;

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
        const setRef = useCallback((instance: HTMLDivElement | null) => {
          if (typeof ref === "function") {
            ref(instance);
          } else if (ref) {
            ref.current = instance;
          }
          provided.innerRef(instance);
        }, []);

        return (
          <TableBody
            component={"div"}
            role={role}
            className={clsx("Grid-body", className, tableBodyClassName)}
            style={{ ...style, ...tableBodyStyle, height }}
            ref={setRef}
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
