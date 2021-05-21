import { DragDropContextProps } from "react-beautiful-dnd";
import { TableOptions } from "react-table";
import { DEFAULT_COMPONENTS } from "./components/const";

export type GridComponents = typeof DEFAULT_COMPONENTS;

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
  components?: GridComponents;
  dragDropEvents?: Partial<DragEventMap>;
}

export type ExtendClassKey<
  Base extends string,
  K extends string = ""
> = `${Base}${K extends "root" ? "" : Capitalize<K>}`;

export type ClassKeyMap<K extends string> = {
  [Key in K]?: string;
};
