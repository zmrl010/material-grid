import { styled, type TableProps } from "@mui/material";
import clsx from "clsx";
import { forwardRef } from "react";
import { GRID_COMPONENT_NAME } from "../constants";
import { gridClasses } from "../style/gridClasses";
import { getBorderColor } from "../style/styleUtil";

const GridRootBase = styled("div", {
  name: GRID_COMPONENT_NAME,
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

const GridRoot = forwardRef<HTMLDivElement, TableProps>(function GridRoot(
  { className, ...props },
  ref
) {
  return (
    <GridRootBase
      ref={ref}
      role="grid"
      className={clsx(className, gridClasses.root)}
      {...props}
    />
  );
});

export default GridRoot;
