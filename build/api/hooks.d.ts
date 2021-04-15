/// <reference types="react" />
import { GridApi, GridApiRef } from "./types";
import { BaseType } from "../types";
export declare function createApi<D extends BaseType = {}>(params: GridApi<D>): GridApi<D>;
export declare function useApiRef<D extends BaseType = {}>(params: GridApi<D>): import("react").MutableRefObject<GridApi<D>>;
export declare function useApi<D extends BaseType = {}>(): GridApiRef<D>;
