import { MutableRefObject } from "react";
import { TableInstance } from "react-table";
import { BaseType, GridComponents } from "../types";

export interface GridApiOptions<D extends BaseType = BaseType> {
  instance: TableInstance<D>;
  components: GridComponents;
  rowDragDropEnabled: boolean;
}

export interface GridApi<D extends BaseType = BaseType>
  extends GridApiOptions<D> {
  hasRows: () => boolean;
}

export type GridApiGetter<D extends BaseType = BaseType> = () => GridApi<D>;

export type GridApiRef<D extends BaseType = BaseType> = MutableRefObject<
  GridApi<D>
>;
