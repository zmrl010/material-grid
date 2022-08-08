import { styled, type TableFooterProps } from "@mui/material";
import clsx from "clsx";
import { GRID_COMPONENT_NAME } from "../constants";
import { gridClasses } from "../style/gridClasses";

const GridFooterBase = styled("div", {
  name: GRID_COMPONENT_NAME,
  slot: "Footer",
})({
  display: "flex",
});

export default function GridFooter({ className, ...props }: TableFooterProps) {
  return (
    <GridFooterBase
      role="row"
      className={clsx(className, gridClasses.footer)}
      {...props}
    />
  );
}
