import { DragDropContextProps } from "react-beautiful-dnd";
import { TableOptions } from "react-table";

export type BaseType = {};

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

export type ExtendClassKey<
  Base extends string,
  K extends string = ""
> = `${Base}${K extends "root" ? "" : Capitalize<K>}`;

export type ClassKeyMap<K extends string> = {
  [Key in K]?: string;
};

export interface RowReorderEvent<D extends Id = Id> {
  (data: D[], sourceIndex: number, destinationIndex: number): void;
}
