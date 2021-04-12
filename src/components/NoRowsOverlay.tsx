import { forwardRef } from "react";

import { Overlay, OverlayProps } from "./Overlay";

export const NoRowsOverlay = forwardRef<HTMLDivElement, OverlayProps>(
  function NoRowsOverlay(props, ref) {
    const noRowsLabel = "No data to display.";

    return (
      <Overlay ref={ref} {...props}>
        {noRowsLabel}
      </Overlay>
    );
  }
);
export default NoRowsOverlay;
