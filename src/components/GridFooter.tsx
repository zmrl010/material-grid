import { StyledComponent } from "@emotion/styled";
import { styled, TableFooter, type TableFooterProps } from "@mui/material";
import { COMPONENT_NAME } from "../constants";

const GridFooter: StyledComponent<TableFooterProps> = styled(
  (props) => <TableFooter component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Footer",
  }
)({
  display: "flex",
});

export default GridFooter;
