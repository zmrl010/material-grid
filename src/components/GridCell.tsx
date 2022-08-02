import { type StyledComponent } from "@emotion/styled";
import { styled, TableCell, type TableCellProps } from "@mui/material";
import { COMPONENT_NAME } from "../constants";

const GridCell: StyledComponent<TableCellProps> = styled(
  (props) => <TableCell component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Cell",
  }
)({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  padding: "0 10px",
  borderBottom: 0,
});

export default GridCell;
