import { CSSProperties } from "react";
import { Droppable } from "react-beautiful-dnd";
import { createStyles, makeStyles, TableBody } from "@material-ui/core";
import clsx from "clsx";
import merge from "lodash/merge";

import GridRow from "./GridRow";
import { useApi } from "../api";
import type { Id } from "../types";

const useStyles = makeStyles(() =>
  createStyles({
    root: (props: { height?: string | number }) => ({
      position: "relative",
      height: props.height,
      display: "block",
      boxSizing: "border-box",
      overflow: "hidden auto",
    }),
    innerScrollContainer: {
      width: "auto",
      overflow: "hidden",
      position: "relative",
    },
  })
);

export interface GridBodyProps {
  className?: string;
  style?: CSSProperties;
  height?: string | number;
  loading: boolean;
}

type Props = GridBodyProps;

export function GridBody<D extends Id = Id>(props: Props) {
  const { loading, className, style, height } = props;

  const getApi = useApi<D>();

  const classes = useStyles({ height });

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
          classes={{ root: classes.root }}
          style={{ ...style, ...tableBodyStyle }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={classes.innerScrollContainer}>
            {showNoRows && <components.NoRowsOverlay />}
            {loading && <components.LoadingOverlay />}
            {instance.rows.map((row) => {
              instance.prepareRow(row);
              return (
                <GridRow
                  {...row.getRowProps()}
                  id={row.id}
                  index={row.index}
                  cells={row.cells}
                />
              );
            })}
          </div>
        </TableBody>
      )}
    </Droppable>
  );
}

export default GridBody;
