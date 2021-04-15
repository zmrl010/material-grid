/// <reference types="react" />
import { HeaderGroup } from "react-table";
import { GridComponents } from "../types";
export interface GridHeaderProps<D extends object = {}> {
    headerGroups: HeaderGroup<D>[];
    components: GridComponents;
}
declare type Props<D extends object = {}> = GridHeaderProps<D>;
export declare function GridHeader<D extends object = {}>(props: Props<D>): JSX.Element;
export default GridHeader;
