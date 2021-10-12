import { TableRow, TableRowClassKey } from "@mui/material";
import { Cell, TableRowProps } from "react-table";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { BaseType, ClassKeyMap } from "../types";
import GridCell from "./GridCell";

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
  dragDropEnabled?: boolean;
}

/**
 * Datatable Row with custom functionality
 * @param props
 * @returns
 */
export function GridRow<D extends BaseType = BaseType>(props: GridRowProps<D>) {
  const {
    id,
    index,
    cells,
    style,
    className,
    dragDropEnabled,
    ...rowProps
  } = props;

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!dragDropEnabled}>
      {(provided, snapshot) => (
        <TableRow
          component={"div"}
          {...rowProps}
          {...provided.draggableProps}
          style={{ ...style, ...provided.draggableProps.style }}
          className={clsx("Grid-row", className, {
            "Grid-row-dragging":
              snapshot.isDragging && !snapshot.isDropAnimating,
          })}
          ref={provided.innerRef}
        >
          {cells.map((cell) => (
            <GridCell {...cell.getCellProps()} variant="body">
              {cell.render("Cell", {
                dragHandleProps: provided.dragHandleProps,
              })}
            </GridCell>
          ))}
        </TableRow>
      )}
    </Draggable>
  );
}

export default GridRow;
