import { TableSortLabel } from "@material-ui/core";
import { NoRowsOverlay } from "./NoRowsOverlay";
import { LoadingOverlay } from "./LoadingOverlay";
import { DragHandleCell } from "./DragHandleCell";

export const DEFAULT_COMPONENTS = {
  SortLabel: TableSortLabel,
  DragHandle: DragHandleCell,
  NoRowsOverlay,
  LoadingOverlay,
};
