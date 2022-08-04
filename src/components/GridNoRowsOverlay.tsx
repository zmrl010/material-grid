import { Typography } from "@mui/material";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Overlay from "./Overlay";

const DEFAULT_NO_ROWS_LABEL = "No rows to display.";

export interface GridNoRowsOverlayProps
  extends ComponentPropsWithoutRef<typeof Overlay> {
  label?: ReactNode;
}

export default function GridNoRowsOverlay({
  label = DEFAULT_NO_ROWS_LABEL,
  ...props
}: GridNoRowsOverlayProps) {
  return (
    <Overlay {...props}>
      <Typography>{label}</Typography>
    </Overlay>
  );
}
