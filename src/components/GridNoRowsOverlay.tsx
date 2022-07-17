import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Overlay } from "./styled";

const DEFAULT_NO_ROWS_LABEL = "No rows to display.";

export interface GridNoRowsOverlayProps
  extends ComponentPropsWithoutRef<typeof Overlay> {
  noRowsLabel?: ReactNode;
}

export default function GridNoRowsOverlay({
  noRowsLabel = DEFAULT_NO_ROWS_LABEL,
  ...props
}: GridNoRowsOverlayProps) {
  return <Overlay {...props}>{noRowsLabel}</Overlay>;
}
