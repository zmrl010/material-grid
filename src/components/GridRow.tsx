import { TableCell, TableRow, TableRowClassKey } from "@material-ui/core";
import { Cell, TableRowProps } from "react-table";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { BaseType, ClassKeyMap } from "../types";
import { useApi } from "../api";
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
}

/**
 * Datatable Row with custom functionality
 * @param props
 * @returns
 */
export function GridRow<D extends BaseType = BaseType>(props: GridRowProps<D>) {
  const { id, index, cells, style, className, ...rowProps } = props;

  const getApi = useApi();

  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={!getApi().rowDragDropEnabled}
    >
      {(provided, snapshot) => (
        <TableRow
          component={"div"}
          {...rowProps}
          {...provided.draggableProps}
          style={{ ...style, ...provided.draggableProps.style }}
          className={clsx("Grid-row", className, {
            "Grid-row-dragging": snapshot.isDragging,
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
