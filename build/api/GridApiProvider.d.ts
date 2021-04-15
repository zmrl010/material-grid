import { ReactNode } from "react";
import type { GridApi } from "./types";
import { BaseType } from "../types";
export interface GridApiProviderProps<D extends BaseType = {}> extends GridApi<D> {
    children: ReactNode;
}
export declare function GridApiProvider<D extends BaseType = {}>(props: GridApiProviderProps<D>): JSX.Element;
export default GridApiProvider;
