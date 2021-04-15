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
import { forwardRef } from "react";
import clsx from "clsx";
import { useStyles } from "./GridRootStyles";
import { Table } from "@material-ui/core";
export const GridRoot = forwardRef(function GridRoot(props, ref) {
    const { className } = props, other = __rest(props, ["className"]);
    const classes = useStyles();
    return (_jsx(Table, Object.assign({ ref: ref, className: clsx(classes.root, className), tabIndex: 0 }, other), void 0));
});
export default GridRoot;
//# sourceMappingURL=GridRoot.js.map