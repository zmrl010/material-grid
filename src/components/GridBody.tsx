import { Droppable } from "react-beautiful-dnd";
import { createStyles, makeStyles, TableBody } from "@material-ui/core";
import { Row } from "react-table";

import { useApi } from "../api";
import type { GridComponents, IdType } from "../types";
import GridRow from "./GridRow";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
    },
  })
);

export interface GridBodyProps<D extends IdType = IdType> {
  rows: Row<D>[];
  loading: boolean;
  showNoRows: boolean;
  isDragDisabled: boolean;
  NoRowsOverlay: GridComponents["NoRowsOverlay"];
  LoadingOverlay: GridComponents["LoadingOverlay"];
}

type Props<D extends IdType = IdType> = GridBodyProps<D>;

export function GridBody<D extends IdType = IdType>(props: Props<D>) {
  const {
    rows,
    loading,
    showNoRows,
    isDragDisabled,
    NoRowsOverlay,
    LoadingOverlay,
  } = props;
  const apiRef = useApi<D>();

  const { getTableBodyProps, prepareRow } = apiRef.current.instance;

  const classes = useStyles();

  const { className, ...tableBodyProps } = getTableBodyProps();

  return (
    <Droppable droppableId="table-body">
      {(provided) => (
        <TableBody
          {...tableBodyProps}
          {...provided.droppableProps}
          className={clsx(className, classes.root)}
          ref={provided.innerRef}
        >
          {showNoRows && <NoRowsOverlay />}
          {loading && <LoadingOverlay />}
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
