import { styled, TableCell } from "@mui/material";

const GridCell = styled(TableCell, { name: "Grid", slot: "Cell" })(
  ({ theme }) => ({
    display: "flex",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
  })
);

export default GridCell;
