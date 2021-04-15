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
import { Typography } from "@material-ui/core";
import { forwardRef } from "react";
import { Overlay } from "./Overlay";
export const NoRowsOverlay = forwardRef(function NoRowsOverlay(props, ref) {
    const { label = "No data to display." } = props, overlayProps = __rest(props, ["label"]);
    return (_jsx(Overlay, Object.assign({ ref: ref }, overlayProps, { children: _jsx(Typography, { children: label }, void 0) }), void 0));
});
export default NoRowsOverlay;
//# sourceMappingURL=NoRowsOverlay.js.map