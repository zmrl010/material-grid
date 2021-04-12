import { createContext, MutableRefObject } from "react";

import { DataTableApi } from "./useApi";

const baseContext: MutableRefObject<DataTableApi> = {
  current: {},
};

const GridContext = createContext(baseContext);
GridContext.displayName = "GridContext";

export { GridContext };
