import { TableSortLabel } from "@material-ui/core";
import NoRowsOverlay from "./NoRowsOverlay";
import LoadingOverlay from "./LoadingOverlay";

export const DEFAULT_COMPONENTS = {
  SortLabel: TableSortLabel,
  NoRowsOverlay,
  LoadingOverlay,
};

export type GridComponents = typeof DEFAULT_COMPONENTS;

export { default as DraggableRow } from "./DraggableRow";
export { default as GridRow } from "./DraggableRow";
export { default as GridMain } from "./GridMain";
export { default as GridRoot } from "./GridRoot";

export { NoRowsOverlay, LoadingOverlay };
