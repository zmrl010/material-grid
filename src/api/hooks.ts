import { useRef, useContext } from "react";
import { GridApiContext } from "./GridApiContext";
import { GridApi, GridApiOptions } from "./types";
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
export function useCreateApi<D extends BaseType = BaseType>(
  props: GridApiOptions<D>
) {
  const apiRef = useRef(INITIAL_STATE as GridApi<D>);

  const getApi = useGetLatest(apiRef.current);

  if (getApi() === INITIAL_STATE) {
    const api = createApi(props);
    Object.assign(getApi(), api);
  }

  return getApi;
}

/**
 * Use api returned from parent context
 * @returns GridApiContext value
 */
export function useApi<D extends BaseType = BaseType>() {
  const context = useContext<(() => GridApi<D>) | null>(GridApiContext);

  if (!context) {
    throw new Error("useApi requires a parent GridApiProvider component.");
  }

  return context;
}
