import { CSSProperties } from "react";
import { Droppable } from "react-beautiful-dnd";
import { TableBody } from "@material-ui/core";
import clsx from "clsx";

import GridRow from "./GridRow";
import { useApi } from "../api";
import type { Id } from "../types";

export interface GridBodyProps {
  className?: string;
  style?: CSSProperties;
  height?: string | number;
  loading: boolean;
}

type Props = GridBodyProps;

export function GridBody<D extends Id = Id>(props: Props) {
  const { loading, className, height, style } = props;

  const getApi = useApi<D>();

  const { instance, components, hasRows } = getApi();
  const {
    className: tableBodyClassName,
    style: tableBodyStyle,
    role,
  } = instance.getTableBodyProps();

  const showNoRows = !loading && !hasRows();

  return (
    <Droppable droppableId="table-body">
      {(provided) => (
        <TableBody
          component={"div"}
          role={role}
          className={clsx("Grid-body", className, tableBodyClassName)}
          style={{ ...style, ...tableBodyStyle, height }}
          ref={provided.innerRef}
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
                  id={row.id}
                  index={row.index}
                  cells={row.cells}
                />
              );
            })
          )}
        </TableBody>
      )}
    </Droppable>
  );
}

export default GridBody;
