import { useMemo } from "react";
import { DEFAULT_COMPONENTS } from "./components";
export function useComponents(propComponents = {}) {
    const components = useMemo(() => (Object.assign(Object.assign({}, DEFAULT_COMPONENTS), propComponents)), [propComponents]);
    return components;
}
//# sourceMappingURL=hooks.js.map