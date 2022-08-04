import { StyledComponent } from "@emotion/styled";
import { styled, type TableFooterProps } from "@mui/material";
import clsx from "clsx";
import { COMPONENT_NAME } from "../constants";
import { gridClasses } from "../styles/gridClasses";

const GridFooterBase: StyledComponent<TableFooterProps> = styled("div", {
  name: COMPONENT_NAME,
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