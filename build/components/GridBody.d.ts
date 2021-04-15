/// <reference types="react" />
import { Row } from "react-table";
import type { GridComponents, IdType } from "../types";
export interface GridBodyProps<D extends IdType = IdType> {
    rows: Row<D>[];
    loading: boolean;
    showNoRows: boolean;
    isDragDisabled: boolean;
    NoRowsOverlay: GridComponents["NoRowsOverlay"];
    LoadingOverlay: GridComponents["LoadingOverlay"];
}
declare type Props<D extends IdType = IdType> = GridBodyProps<D>;
declare function GridBody<D extends IdType = IdType>(props: Props<D>): JSX.Element;
export default GridBody;
