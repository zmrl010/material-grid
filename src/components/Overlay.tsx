import "@mui/system";
import { styled } from "@mui/material";
import { COMPONENT_NAME } from "../constants";

const Overlay = styled("div", {
  name: COMPONENT_NAME,
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
