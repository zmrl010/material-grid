import { DragDropContextProps } from "react-beautiful-dnd";
import { TableOptions } from "react-table";

export type BaseType = Record<string, unknown>;

export type Id = { id: number } & BaseType;

export type DragEventMap = Pick<
  DragDropContextProps,
  | "onDragStart"
  | "onDragEnd"
  | "onDragUpdate"
  | "onBeforeCapture"
  | "onBeforeDragStart"
>;

export interface GridOptions<D extends Id = Id> extends TableOptions<D> {
  enableRowDragDrop?: boolean;
  dragDropEvents?: Partial<DragEventMap>;
}

export interface RowReorderEvent<D extends Id = Id> {
  (data: D[], sourceIndex: number, destinationIndex: number): void;
}
