import { StyledComponent } from "@emotion/styled";
import { styled } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";
import { COMPONENT_NAME } from "../constants";

const Overlay: StyledComponent<ComponentPropsWithoutRef<"div">> = styled(
  "div",
  {
    name: COMPONENT_NAME,
    slot: "Overlay",
  }
)(({ theme }) => ({
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
