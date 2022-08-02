import { StyledComponent } from "@emotion/styled";
import {
  styled,
  tableCellClasses,
  TableRow,
  type TableRowProps,
} from "@mui/material";
import { COMPONENT_NAME } from "../constants";

const GridRow: StyledComponent<TableRowProps> = styled(
  (props) => <TableRow component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Row",
  }
)(() => ({
  display: "flex",
  width: "fit-content",
  breakInside: "avoid",

  [`& .${tableCellClasses.root}`]: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

export default GridRow;
