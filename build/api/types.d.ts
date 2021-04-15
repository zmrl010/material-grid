import { MutableRefObject } from "react";
import { TableInstance } from "react-table";
import { BaseType, GridComponents } from "../types";
export interface GridApi<D extends BaseType = {}> {
    instance: TableInstance<D>;
    components: GridComponents;
    rowDragDropDisabled: boolean;
}
export declare type GridApiRef<D extends BaseType = {}> = MutableRefObject<GridApi<D>>;
