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
import { DragIndicator } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";
const useStyles = makeStyles(() => createStyles({
    root: (props) => ({
        cursor: "grab",
        position: "absolute",
        top: "30%",
        [props.anchor]: 0,
        // opacity: 0.3,
        // "&:hover": {
        //   opacity: 1,
        // },
    }),
}));
export const DragHandle = forwardRef(function DragHandle(props, ref) {
    const { IconComponent = DragIndicator, anchor = "left", className } = props, divProps = __rest(props, ["IconComponent", "anchor", "className"]);
    const classes = useStyles({ anchor });
    return (_jsx("span", Object.assign({}, divProps, { className: clsx(className, classes.root), ref: ref }, { children: _jsx(IconComponent, { fontSize: "small" }, void 0) }), void 0));
});
export default DragHandle;
//# sourceMappingURL=DragHandle.js.map