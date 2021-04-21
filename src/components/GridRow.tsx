import {
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Cell, TableRowProps } from "react-table";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
  })
);

export const ItemTypes = {
  ROW: "row",
};

export interface RowItem {
  index: number;
}

export interface GridRowProps<D extends object = {}> extends TableRowProps {
  // row: Row<D>;
  id: string;
  index: number;
  isDragDisabled: boolean;
  cells: Cell<D>[];
}

/**
 * Datatable Row with custom functionality
 * @param props
 * @returns
 */
function GridRow<D extends object = {}>(props: GridRowProps<D>) {
  const {
    id,
    index,
    cells,
    isDragDisabled,
    style,
    className,
    ...rowProps
  } = props;

  const classes = useStyles();

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided) => (
        <TableRow
          {...rowProps}
          {...provided.draggableProps}
          style={{
            ...style,
            ...provided.draggableProps.style,
          }}
          className={clsx("Grid-row", className)}
          classes={{
            root: classes.root,
          }}
          ref={provided.innerRef}
        >
          {cells.map((cell) => (
            <TableCell {...cell.getCellProps()}>
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
