import { CSSProperties } from "react";
import { Droppable } from "react-beautiful-dnd";
import { createStyles, makeStyles, TableBody } from "@material-ui/core";
import { Row } from "react-table";
import clsx from "clsx";

import { useApi } from "../api";
import type { GridComponents, Id } from "../types";
import GridRow from "./GridRow";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
    },
  })
);

export interface GridBodyClasses {}

export interface GridBodyProps<D extends Id = Id> {
  className?: string;
  style?: CSSProperties;
  rows: Row<D>[];
  loading: boolean;
  isDragDisabled: boolean;
  components: Pick<GridComponents, "NoRowsOverlay" | "LoadingOverlay">;
}

type Props<D extends Id = Id> = GridBodyProps<D>;

export function GridBody<D extends Id = Id>(props: Props<D>) {
  const { rows, loading, className, style, isDragDisabled, components } = props;

  const classes = useStyles();
  const apiRef = useApi<D>();

  const { getTableBodyProps, prepareRow } = apiRef.current.instance;
  const {
    className: tableBodyClassName,
    ...tableBodyProps
  } = getTableBodyProps();

  const showNoRows = !loading && rows.length === 0;

  return (
    <Droppable droppableId="table-body">
      {(provided) => (
        <TableBody
          {...tableBodyProps}
          {...provided.droppableProps}
          className={clsx(
            "Grid-body",
            className,
            tableBodyClassName,
            classes.root
          )}
          style={style}
          ref={provided.innerRef}
        >
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
        </TableBody>
      )}
    </Droppable>
  );
}

export default GridBody;
