import {
  // createStyles,
  // makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Row, TableRowProps } from "react-table";
import { Draggable } from "react-beautiful-dnd";
import { DragHandleCell } from "./DragHandleCell";

// const useStyles = makeStyles((theme) => createStyles({}));

export const ItemTypes = {
  ROW: "row",
};

export interface RowItem {
  index: number;
}

export interface GridRowProps<D extends object = {}> extends TableRowProps {
  row: Row<D>;
  isDragDisabled: boolean;
}

/**
 * Datatable Row with custom functionality
 * @param props
 * @returns
 */
function GridRow<D extends object = {}>(props: GridRowProps<D>) {
  const { row, isDragDisabled } = props;

  return (
    <Draggable
      draggableId={row.id}
      index={row.index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <TableRow
          ref={provided.innerRef}
          {...row.getRowProps()}
          {...provided.draggableProps}
        >
          {!isDragDisabled && <DragHandleCell {...provided.dragHandleProps} />}
          {row.cells.map((cell) => (
            <TableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </TableCell>
          ))}
        </TableRow>
      )}
    </Draggable>
  );
}

export default GridRow;
