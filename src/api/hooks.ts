import { useRef, useContext } from "react";
import { GridApiContext } from "./GridApiContext";
import { GridApi, GridApiRef } from "./types";
import { BaseType } from "../types";

export function createApi<D extends BaseType = {}>(
  params: GridApi<D>
): GridApi<D> {
  return { ...params };
}

const INITIAL_STATE = {};

export function useApiRef<D extends BaseType = {}>(params: GridApi<D>) {
  const apiRef = useRef(INITIAL_STATE as GridApi<D>);

  if (apiRef.current === INITIAL_STATE) {
    apiRef.current = createApi(params);
  }

  return apiRef;
}

export function useApi<D extends BaseType = {}>() {
  const context = useContext<GridApiRef<D> | null>(GridApiContext);

  if (!context) {
    // FIXME error message needs work
    throw new Error("GridApiProvider component is not a parent.");
  }

  return context;
}
