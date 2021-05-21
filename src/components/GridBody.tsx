import { CSSProperties } from "react";
import { Droppable } from "react-beautiful-dnd";
import { createStyles, makeStyles, TableBody } from "@material-ui/core";
import { Row } from "react-table";
import clsx from "clsx";
import merge from "lodash/merge";

import GridRow from "./GridRow";
import { useApi } from "../api";
import type { GridComponents, Id } from "../types";

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

export interface GridBodyClasses {}

export interface GridBodyProps<D extends Id = Id> {
  className?: string;
  style?: CSSProperties;
  height?: string | number;
  rows: Row<D>[];
  loading: boolean;
  isDragDisabled: boolean;
  components: Pick<GridComponents, "NoRowsOverlay" | "LoadingOverlay">;
}

type Props<D extends Id = Id> = GridBodyProps<D>;

export function GridBody<D extends Id = Id>(props: Props<D>) {
  const {
    rows,
    loading,
    className,
    style,
    height,
    isDragDisabled,
    components,
  } = props;

  const classes = useStyles({ height });
  const apiRef = useApi<D>();

  const { getTableBodyProps, prepareRow } = apiRef.current.instance;
  const {
    className: tableBodyClassName,
    style: tableBodyStyle,
    ...tableBodyProps
  } = getTableBodyProps();

  const showNoRows = !loading && rows.length === 0;

  return (
    <Droppable droppableId="table-body">
      {(provided) => (
        <TableBody
          component={"div"}
          {...tableBodyProps}
          {...provided.droppableProps}
          className={clsx("Grid-body", className, tableBodyClassName)}
          classes={{ root: classes.root }}
          style={merge(style, tableBodyStyle)}
          ref={provided.innerRef}
        >
          <div className={classes.innerScrollContainer}>
            {showNoRows && <components.NoRowsOverlay />}
            {loading && <components.LoadingOverlay />}
            {rows.map((row) => {
              prepareRow(row);
              return (
                <GridRow
                  {...row.getRowProps()}
                  id={row.id}
                  index={row.index}
                  cells={row.cells}
                  isDragDisabled={isDragDisabled}
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
