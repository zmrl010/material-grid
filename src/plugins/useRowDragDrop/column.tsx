import DragHandle, { DragHandleProps } from "./DragHandle";

export const DRAG_HANDLE_COLUMN_ID = "drag-handle";

/**
 * Drag handle columns to be used in drag and drop
 */
export const dragHandleColumn = {
  id: DRAG_HANDLE_COLUMN_ID,
  Header: "",
  Cell: ({ dragHandleProps }: { dragHandleProps: DragHandleProps }) => (
    <DragHandle {...dragHandleProps} />
  ),
  disableSortBy: true,
  width: 25,
};
