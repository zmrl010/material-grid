import { MutableRefObject } from "react";
import { TableInstance } from "react-table";
import { BaseType, GridComponents } from "../types";

export interface GridApi<D extends BaseType = BaseType> {
  instance: TableInstance<D>;
  components: GridComponents;
  // rowDragDropDisabled: boolean;
}

export type GridApiRef<D extends BaseType = BaseType> = MutableRefObject<
  GridApi<D>
>;
