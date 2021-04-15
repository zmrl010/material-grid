/// <reference types="react" />
import { DragDropContextProps } from "react-beautiful-dnd";
import { GridApiProviderProps } from "../api";
import { BaseType } from "../types";
export declare type GridProviderProps<D extends BaseType = {}> = GridApiProviderProps<D> & DragDropContextProps;
declare type Props<D extends BaseType = {}> = GridProviderProps<D>;
/**
 * Table component that wraps all table providers to a single provider
 * @param props
 * @returns
 */
export declare function GridProvider<D extends BaseType = {}>(props: Props<D>): JSX.Element;
export default GridProvider;
