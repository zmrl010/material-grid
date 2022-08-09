import { styled } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";
import { StyledComponent } from "@emotion/styled";
import { GRID_COMPONENT_NAME } from "../constants";

type StyledDiv = StyledComponent<ComponentPropsWithoutRef<"div">>;

const Overlay: StyledDiv = styled("div", {
  name: GRID_COMPONENT_NAME,
  slot: "Overlay",
})(({ theme }) => ({
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
}));

export default Overlay;
