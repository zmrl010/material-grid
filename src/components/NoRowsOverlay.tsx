import { Typography } from "@mui/material";
import { forwardRef } from "react";

import { Overlay, OverlayProps } from "./Overlay";

export interface NoRowsOverlayProps extends OverlayProps {
  label?: string;
}

export const NoRowsOverlay = forwardRef<HTMLDivElement, NoRowsOverlayProps>(
  function NoRowsOverlay(props, ref) {
    const { label = "No data to display.", ...overlayProps } = props;

    return (
      <Overlay ref={ref} {...overlayProps}>
        <Typography>{label}</Typography>
      </Overlay>
    );
  }
);
export default NoRowsOverlay;
