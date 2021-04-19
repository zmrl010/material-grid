import { DragDropContextProps } from "react-beautiful-dnd";
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
