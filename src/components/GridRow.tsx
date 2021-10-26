import {
  styled,
  TableRow,
  TableRowClassKey,
  TableRowProps,
} from "@mui/material";
import { Cell } from "react-table";
import { Draggable } from "react-beautiful-dnd";
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
function DraggableGridRow<D extends BaseType = BaseType>(
  props: GridRowProps<D>
) {
  const { id, index, cells, style, dragDropEnabled, ...rowProps } = props;

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!dragDropEnabled}>
      {(provided, snapshot) => (
        <TableRow
          component="div"
          {...rowProps}
          {...provided.draggableProps}
          sx={{
            ...(snapshot.isDragging &&
              !snapshot.isDropAnimating && { display: "table" }),
          }}
          style={{ ...style, ...provided.draggableProps.style }}
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

export const GridRow = styled(DraggableGridRow, {
  name: "Grid",
  slot: "Row",
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default GridRow;
