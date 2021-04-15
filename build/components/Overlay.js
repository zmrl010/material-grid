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
import clsx from "clsx";
import { forwardRef } from "react";
export const Overlay = forwardRef(function Overlay(props, ref) {
    const { className, style } = props, other = __rest(props, ["className", "style"]);
    return (_jsx("div", Object.assign({ ref: ref, className: clsx("DataTable-overlay", className), style: style }, other), void 0));
});
//# sourceMappingURL=Overlay.js.map