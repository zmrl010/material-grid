import { useRef, useContext } from "react";
import { GridApiContext } from "./GridApiContext";
export function createApi(params) {
    return Object.assign({}, params);
}
const INITIAL_STATE = {};
export function useApiRef(params) {
    const apiRef = useRef(INITIAL_STATE);
    if (apiRef.current === INITIAL_STATE) {
        apiRef.current = createApi(params);
    }
    return apiRef;
}
export function useApi() {
    const context = useContext(GridApiContext);
    if (!context) {
        // FIXME error message needs work
        throw new Error("GridApiProvider component is not a parent.");
    }
    return context;
}
//# sourceMappingURL=hooks.js.map