import {
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { DragHandle, DragIndicator } from "@material-ui/icons";
import clsx from "clsx";
import { forwardRef, useRef } from "react";
// import { useDrag, useDrop } from "react-dnd";
import { Row } from "react-table";

export const ItemTypes = {
  ROW: "row",
};

export interface RowItem {
  index: number;
}

export interface GridRowProps<D extends object = {}> {
  row: Row<D>;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

/**
 * Datatable Row with custom functionality
 * @see https://react-table.tanstack.com/docs/examples/row-dnd
 * @see https://react-dnd.github.io/react-dnd/examples/dustbin/single-target
 * @param props
 * @returns
 */
export function DraggableRow<D extends object = {}>(props: GridRowProps<D>) {
  const { row, index, moveRow } = props;

  const dropRef = useRef<HTMLTableRowElement | null>(null);
  const dragRef = useRef<HTMLElement | null>(null);

  // const [, drop] = useDrop({
  //   accept: ItemTypes.ROW,
  //   hover(item: RowItem, monitor) {
  //     if (!dropRef.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;
  //     // Don't replace items with themselves
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }
  //     // Determine rectangle on screen
  //     const hoverBoundingRect = dropRef.current.getBoundingClientRect();
  //     // Get vertical middle
  //     const hoverMiddleY =
  //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     // Determine mouse position
  //     const clientOffset = monitor.getClientOffset() ?? { y: 0 };
  //     // Get pixels to the top

  //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  //     // Only perform the move when the mouse has crossed half of the items height
  //     // When dragging downwards, only move when the cursor is below 50%
  //     // When dragging upwards, only move when the cursor is above 50%
  //     // Dragging downwards
  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //       return;
  //     }
  //     // Dragging upwards
  //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //       return;
  //     }

  //     // Time to actually perform the action
  //     moveRow(dragIndex, hoverIndex);
  //     // Note: we're mutating the monitor item here!
  //     // Generally it's better to avoid mutations,
  //     // but it's good here for the sake of performance
  //     // to avoid expensive index searches.
  //     item.index = hoverIndex;
  //   },
  // });

  // const [{ isDragging }, drag, preview] = useDrag({
  //   type: ItemTypes.ROW,
  //   item: { index, type: ItemTypes.ROW },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // preview(drop(dropRef));
  // drag(dragRef);

  const rowProps = row.getRowProps();

  return (
    <TableRow
      ref={dropRef}
      {...rowProps}
      // style={{ ...style, opacity: isDragging ? 0 : 1 }}
    >
      <TableCell ref={dragRef} colSpan={1} align={"left"}>
        <DragIndicator style={{ cursor: "grab" }} />
      </TableCell>
      {row.cells.map((cell) => (
        <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
      ))}
    </TableRow>
  );
}

export default DraggableRow;
