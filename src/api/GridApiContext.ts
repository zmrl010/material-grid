import { createContext } from "react";

import { GridApi } from "./types";

const GridApiContext = createContext<(() => GridApi<any>) | null>(null);
GridApiContext.displayName = "GridApiContext";

export { GridApiContext };
