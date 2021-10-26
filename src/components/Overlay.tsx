import { styled } from "@mui/material";
import { HTMLAttributes } from "react";

export type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay = styled("div", { name: "Grid", slot: "Overlay" })(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  })
);

export default Overlay;
