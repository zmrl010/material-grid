import { CircularProgress } from "@material-ui/core";
import { forwardRef } from "react";

import { Overlay, OverlayProps } from "./Overlay";

export const LoadingOverlay = forwardRef<HTMLDivElement, OverlayProps>(
  function LoadingOverlay(props, ref) {
    return (
      <Overlay ref={ref} {...props}>
        <CircularProgress />
      </Overlay>
    );
  }
);
export default LoadingOverlay;
