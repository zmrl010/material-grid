import { useRef, useContext } from "react";
import { GridApiContext } from "./GridApiContext";
import { GridApi, GridApiRef } from "./types";
import { BaseType } from "../types";

export function createApi<D extends BaseType = BaseType>(
  params: GridApi<D>
): GridApi<D> {
  return { ...params };
}

const INITIAL_STATE = {};

/**
 * Creates mutable ref that holds the api.
 * @param params api parameters
 * @returns api ref
 */
export function useApiRef<D extends BaseType = BaseType>(params: GridApi<D>) {
  const apiRef = useRef(INITIAL_STATE as GridApi<D>);

  if (apiRef.current === INITIAL_STATE) {
    apiRef.current = createApi(params);
  }

  return apiRef;
}

/**
 * Use api returned from parent context
 * @returns GridApiContext value
 */
export function useApi<D extends BaseType = BaseType>() {
  const context = useContext<GridApiRef<D> | null>(GridApiContext);

  if (!context) {
    throw new Error("useApi requires a parent GridApiProvider component.");
  }

  return context;
}
