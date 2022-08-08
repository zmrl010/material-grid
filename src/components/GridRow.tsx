import { type StyledComponent } from "@emotion/styled";
import { styled, type TableRowProps } from "@mui/material";
import clsx from "clsx";
import { GRID_COMPONENT_NAME } from "../constants";
import { gridClasses } from "../style/gridClasses";

const GridRowRoot: StyledComponent<TableRowProps> = styled("div", {
  name: GRID_COMPONENT_NAME,
  slot: "Row",
})({
  display: "flex",
  width: "fit-content",
  breakInside: "avoid",

  [`& .${gridClasses.cell}`]: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

export default function GridRow({
  className,
  children,
  ...props
}: TableRowProps) {
  return (
    <GridRowRoot
      role="row"
      className={clsx(className, gridClasses.row)}
      {...props}
    >
      {children}
    </GridRowRoot>
  );
}
