import { type StyledComponent } from "@emotion/styled";
import { styled, type TableCellProps } from "@mui/material";
import clsx from "clsx";
import { COMPONENT_NAME } from "../constants";
import { gridClasses } from "../styles/gridClasses";

const GridCellBase: StyledComponent<TableCellProps> = styled("div", {
  name: COMPONENT_NAME,
  slot: "Cell",
})({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  padding: "0 10px",
  borderBottom: 0,
});

export default function GridCell({ className, ...props }: TableCellProps) {
  return (
    <GridCellBase
      role="cell"
      className={clsx(className, gridClasses.cell)}
      {...props}
    />
  );
}
