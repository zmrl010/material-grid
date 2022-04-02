import { TableRow, TableRowProps } from "@mui/material";
import { Cell } from "react-table";
import { Draggable } from "react-beautiful-dnd";
import { BaseType } from "../types";
import GridCell from "./GridCell";

export interface GridRowProps<D extends BaseType = BaseType>
  extends TableRowProps {
  id: string;
  index: number;
  cells: Cell<D>[];
  dragDropEnabled?: boolean;
}

export default function GridRow<D extends BaseType = BaseType>({
  id,
  index,
  cells,
  style,
  dragDropEnabled,
  ...rowProps
}: GridRowProps<D>) {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!dragDropEnabled}>
      {(
        { innerRef, draggableProps, dragHandleProps },
        { isDragging, isDropAnimating }
      ) => (
        <TableRow
          component="div"
          {...rowProps}
          {...draggableProps}
          sx={{
            bgcolor: "background.paper",
            display: isDragging && !isDropAnimating ? "table" : undefined,
          }}
          style={{ ...style, ...draggableProps.style }}
          ref={innerRef}
        >
          {cells.map((cell) => (
            <GridCell {...cell.getCellProps()} variant="body" component="div">
              {cell.render("Cell", { dragHandleProps })}
            </GridCell>
          ))}
        </TableRow>
      )}
    </Draggable>
  );
}
