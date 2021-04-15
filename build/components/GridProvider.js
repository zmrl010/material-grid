var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { DragDropContext } from "react-beautiful-dnd";
import { GridApiProvider } from "../api";
/**
 * Table component that wraps all table providers to a single provider
 * @param props
 * @returns
 */
export function GridProvider(props) {
    const { children, instance, components, rowDragDropDisabled } = props, dragDropProps = __rest(props, ["children", "instance", "components", "rowDragDropDisabled"]);
    return (_jsx(GridApiProvider, Object.assign({ instance: instance, components: components, rowDragDropDisabled: rowDragDropDisabled }, { children: _jsx(DragDropContext, Object.assign({}, dragDropProps, { children: children }), void 0) }), void 0));
}
export default GridProvider;
//# sourceMappingURL=GridProvider.js.map