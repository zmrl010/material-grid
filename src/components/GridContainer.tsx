import {
  TableContainer,
  Paper,
  styled,
  TableContainerProps,
} from "@mui/material";

const PaperContainer = (props: TableContainerProps) => (
  <TableContainer component={Paper} {...props} />
);

const GridContainer = styled(PaperContainer)(({ theme }) => ({
  boxSizing: "border-box",
  color: theme.palette.text.primary,

  "& *, & *::before, & *::after": {
    boxSizing: "inherit",
  },

  "& .MuiTable-root": {
    display: "table",
    flexFlow: "column nowrap",
    height: "100%",
    outline: "none",
    overflow: "auto",
  },

  "& .MuiTableBody-root": {
    display: "block",
    flex: 1,
    overflowX: "hidden",
    overflowY: "auto",
    position: "relative",
  },

  "& .MuiTableCell-root": {
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  "& .MuiTableRow-root": {
    backgroundColor: theme.palette.background.paper,
  },

  "& .MuiTableHead-root": {
    display: "flex",
    overflowX: "hidden",
    overflowY: "auto",
  },
}));

export default GridContainer;
