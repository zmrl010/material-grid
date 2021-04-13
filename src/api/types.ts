import { MutableRefObject } from "react";
import { TableInstance } from "react-table";
import { BaseType, GridComponents } from "../types";

// export interface GridApiConfig {
//   rowDragDropDisabled: boolean;
// }

export interface GridApi<D extends BaseType = {}> {
  instance: TableInstance<D>;
  components: GridComponents;
  rowDragDropDisabled: boolean;
}

export type GridApiRef<D extends BaseType = {}> = MutableRefObject<GridApi<D>>;
