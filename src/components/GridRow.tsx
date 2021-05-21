import {
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  TableRowClassKey,
  Theme,
} from "@material-ui/core";
import { Cell, TableRowProps } from "react-table";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import merge from "lodash/merge";
import { BaseType, ClassKeyMap } from "../types";
import { useApi } from "../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export interface RowItem {
  index: number;
}

export interface GridRowClasses {
  root: string;
}

export type GridRowClassKey = TableRowClassKey;

export interface GridRowProps<D extends BaseType = BaseType>
  extends TableRowProps {
  id: string;
  index: number;
  cells: Cell<D>[];
  classes?: ClassKeyMap<TableRowClassKey>;
}

/**
 * Datatable Row with custom functionality
 * @param props
 * @returns
 */
export function GridRow<D extends BaseType = BaseType>(props: GridRowProps<D>) {
  const { id, index, cells, style, className, ...rowProps } = props;

  const classes = useStyles();

  const getApi = useApi();

  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={!getApi().rowDragDropEnabled}
    >
      {(provided) => (
        <TableRow
          component={"div"}
          {...rowProps}
          {...provided.draggableProps}
          style={{ ...style, ...provided.draggableProps.style }}
          className={clsx("Grid-row", className, classes.root)}
          ref={provided.innerRef}
        >
          {cells.map((cell) => (
            <TableCell {...cell.getCellProps()} component="div">
              {cell.render("Cell", {
                dragHandleProps: provided.dragHandleProps,
              })}
            </TableCell>
          ))}
        </TableRow>
      )}
    </Draggable>
  );
}

export default GridRow;
