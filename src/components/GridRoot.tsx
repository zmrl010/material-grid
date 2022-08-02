import { type StyledComponent } from "@emotion/styled";
import { styled, Table, type TableProps } from "@mui/material";
import getBorderColor from "../styles/getBorderColor";
import { COMPONENT_NAME } from "../constants";

const GridRoot: StyledComponent<TableProps> = styled(
  (props) => <Table component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Root",
  }
)(({ theme }) => ({
  flex: 1,
  boxSizing: "border-box",
  position: "relative",
  border: `1px solid ${getBorderColor(theme)}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
  ...theme.typography.body2,
  outline: "none",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export default GridRoot;
