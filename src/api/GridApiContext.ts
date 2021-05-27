import { createContext } from "react";

import { GridApiRef } from "./types";

const GridApiContext = createContext<GridApiRef<any> | null>(null);
GridApiContext.displayName = "GridApiContext";

export { GridApiContext };
