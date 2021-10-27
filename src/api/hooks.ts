import { useRef, useContext } from "react";
import { GridApiContext } from "./GridApiContext";
import { GridApi, GridApiOptions, GridApiRef } from "./types";
import { BaseType } from "../types";
import { useGetLatest } from "react-table";

export function createApi<D extends BaseType = BaseType>(
  props: GridApiOptions<D>
): GridApi<D> {
  const hasRows = () => props.instance.rows.length !== 0;
  return { ...props, hasRows };
}

const INITIAL_STATE = {};

/**
 * Creates a container to hold the main api object and returns a getter for it
 * @param params api parameters
 * @returns getter function that returns api ref
 */
export function useApiRef<D extends BaseType = BaseType>(
  props: GridApiOptions<D>
) {
  const apiRef = useRef(INITIAL_STATE as GridApi<D>);

  if (apiRef.current === INITIAL_STATE) {
    const api = createApi(props);
    Object.assign(apiRef.current, api);
  }

  return apiRef;
}

/**
 * Use api returned from parent context
 * @returns GridApiContext value
 */
export function useApiContext<D extends BaseType = BaseType>() {
  const context = useContext<GridApiRef<D> | null>(GridApiContext);

  if (!context) {
    throw new Error("useApi requires a parent GridApiProvider component.");
  }

  return context;
}

/**
 * Use api returned from parent context
 * @returns GridApiContext value
 */
export function useGetApi<D extends BaseType = BaseType>(
  apiRef: GridApiRef<D>
) {
  return useGetLatest(apiRef.current);
}

export function useGridApi<D extends BaseType = BaseType>(
  apiRef: GridApiRef<D>
) {
  const getApi = useGetApi<D>(apiRef);

  return getApi();
}

export function useGridInstance<D extends BaseType = BaseType>(
  apiRef: GridApiRef<D>
) {
  const getApi = useGetApi<D>(apiRef);

  return getApi().instance;
}

export function useGridComponents<D extends BaseType = BaseType>(
  apiRef: GridApiRef<D>
) {
  const getApi = useGetApi<D>(apiRef);

  return getApi().components;
}
