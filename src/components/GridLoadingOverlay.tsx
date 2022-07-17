import { CircularProgress } from "@mui/material";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Overlay } from "./styled";

export interface GridLoadingOverlayProps
  extends ComponentPropsWithoutRef<typeof Overlay> {
  loadingIndicator?: ReactNode;
}

export default function GridLoadingOverlay({
  loadingIndicator = <CircularProgress />,
  ...props
}: GridLoadingOverlayProps) {
  return <Overlay {...props}>{loadingIndicator}</Overlay>;
}
