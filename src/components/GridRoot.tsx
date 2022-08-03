import { type StyledComponent } from "@emotion/styled";
import { styled, type TableProps } from "@mui/material";
import getBorderColor from "../styles/getBorderColor";
import { COMPONENT_NAME } from "../constants";
import { gridClasses } from "../styles/gridClasses";
import clsx from "clsx";

const GridRootBase: StyledComponent<TableProps> = styled("div", {
  name: COMPONENT_NAME,
  slot: "Root",
})(({ theme }) => ({
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

function GridRoot({ className, ...props }: TableProps) {
  return (
    <GridRootBase
      role="grid"
      className={clsx(className, gridClasses.root)}
      {...props}
    />
  );
}

export default GridRoot;
