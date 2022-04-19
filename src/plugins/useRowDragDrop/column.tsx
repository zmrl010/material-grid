import { type Column } from "react-table";
import DragHandle from "./DragHandle";

export const DRAG_HANDLE_COLUMN_ID = "drag-handle";

// interface DragCellProps {
//   dragHandleProps: DragHandleProps;
// }

/**
 * Drag handle columns to be used in drag and drop
 */
export const dragHandleColumn: Column = {
  id: DRAG_HANDLE_COLUMN_ID,
  Header: "",
  Cell: ({ dragHandleProps }: any) => <DragHandle {...dragHandleProps} />,
  disableSortBy: true,
  width: 25,
};
