/// <reference types="react" />
import { Row, TableRowProps } from "react-table";
export declare const ItemTypes: {
    ROW: string;
};
export interface RowItem {
    index: number;
}
export interface GridRowProps<D extends object = {}> extends TableRowProps {
    row: Row<D>;
    isDragDisabled: boolean;
}
/**
 * Datatable Row with custom functionality
 * @param props
 * @returns
 */
declare function GridRow<D extends object = {}>(props: GridRowProps<D>): JSX.Element;
export default GridRow;
