import { useRef } from "react";

export interface DataTableApi {}

export function createApi(opts: Partial<DataTableApi> = {}): DataTableApi {
  return { ...opts };
}

const BASE_STATE = {} as DataTableApi;

export function useApi(opts: Partial<DataTableApi> = {}) {
  const apiRef = useRef<DataTableApi>(BASE_STATE);

  if (apiRef.current === BASE_STATE) {
    apiRef.current = createApi(opts);
  }

  return apiRef;
}
