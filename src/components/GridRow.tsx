import { TableCell, TableRow } from "@material-ui/core";
import { Cell, TableRowProps } from "react-table";
import { Draggable } from "react-beautiful-dnd";

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
  const { id, index, cells, isDragDisabled, style, ...rowProps } = props;

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
