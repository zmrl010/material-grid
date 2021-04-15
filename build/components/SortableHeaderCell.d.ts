import { ReactNode } from "react";
import { HeaderGroup } from "react-table";
declare type SortDirection = "desc" | "asc";
export declare type SortLabelProps = {
    active: boolean;
    direction?: SortDirection;
    children?: ReactNode;
};
export interface SortableHeaderCellProps<D extends object = {}> {
    column: HeaderGroup<D>;
    SortLabel: (props: SortLabelProps) => JSX.Element;
}
export declare function SortableHeaderCell<D extends object = {}>(props: SortableHeaderCellProps<D>): JSX.Element;
export {};
