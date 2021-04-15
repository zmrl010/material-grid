import { Column } from "react-table";
import { HTMLAttributes } from "react";
import { GridComponents, IdType } from "./types";
export interface DataTableOptions<D extends IdType = IdType> {
    columns: Column<D>[];
    data: D[];
    disableSortBy?: boolean;
    defaultCanSort?: boolean;
    enableRowDragDrop?: boolean;
    components?: GridComponents;
}
export interface GridProps<D extends IdType = IdType> extends DataTableOptions<D>, HTMLAttributes<HTMLTableElement> {
    loading?: boolean;
}
export declare function Grid<D extends IdType = IdType>(props: GridProps<D>): JSX.Element;
export default Grid;
