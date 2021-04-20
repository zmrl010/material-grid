import { DragDropContextProps } from "react-beautiful-dnd";
import { TableOptions } from "react-table";
import { DEFAULT_COMPONENTS } from "./components/const";

export type GridComponents = typeof DEFAULT_COMPONENTS;

export type BaseType = {};

export type IdType = { id: number } & BaseType;

export type DragEventMap = Pick<
  DragDropContextProps,
  | "onDragStart"
  | "onDragEnd"
  | "onDragUpdate"
  | "onBeforeCapture"
  | "onBeforeDragStart"
>;

export interface GridOptions<D extends IdType = IdType>
  extends TableOptions<D> {
  // TODO conditional disableRowDragDrop based on defaultCanSort
  // TODO make error if both are set the same
  enableRowDragDrop?: boolean;
  components?: GridComponents;
  dragDropEvents?: Partial<DragEventMap>;
}
