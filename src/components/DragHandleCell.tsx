import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useGetApi } from "../api";

export type DragHandleCellProps = {
  dragHandleProps: DraggableProvidedDragHandleProps;
};

export const DRAG_HANDLE_COLUMN_ID = "drag-handle";

/**
 * Drag handle columns to be used in drag and drop
 */
export const dragHandleColumn = {
  id: DRAG_HANDLE_COLUMN_ID,
  Header: "",
  Cell: DragHandleCell,
  disableSortBy: true,
  width: 25,
};

/**
 * A cell component to render a drag handle
 * @param props
 * @returns
 */
export function DragHandleCell({ dragHandleProps }: DragHandleCellProps) {
  const getApi = useGetApi();
  const { DragHandle } = getApi().components;
  return <DragHandle {...dragHandleProps} />;
}
