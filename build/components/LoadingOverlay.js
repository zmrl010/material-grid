import { jsx as _jsx } from "react/jsx-runtime";
import { CircularProgress } from "@material-ui/core";
import { forwardRef } from "react";
import { Overlay } from "./Overlay";
export const LoadingOverlay = forwardRef(function LoadingOverlay(props, ref) {
    return (_jsx(Overlay, Object.assign({ ref: ref }, props, { children: _jsx(CircularProgress, {}, void 0) }), void 0));
});
export default LoadingOverlay;
//# sourceMappingURL=LoadingOverlay.js.map