import {
  TableContainer,
  styled,
  // Table,
  // TableBody,
  // TableCell,
  TableHead,
  // TableFooter,
  TableHeadProps,
} from "@mui/material";

export const GridMain = styled(TableContainer)(({ theme }) => ({
  ...theme.typography.body2,
  boxSizing: "border-box",
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  height: "100%",
  width: "100%",
  display: "flex",
  outline: "currentcolor none medium",
  flexDirection: "column",
  flex: "1 1 0%",
  position: "relative",

  "& *, & *::before, & *::after": {
    boxSizing: "inherit",
  },

  "& .MuiTable-root": {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: 1,
    // flexFlow: "column nowrap",
    // height: "100%",
    // outline: "none",
    overflow: "hidden",
  },

  "& .MuiTableBody-root": {
    // display: "flex",
    // flex: 1,
    // overflow: "scroll",
    // overflowX: "auto",
    // overflowY: "auto",
    // position: "relative",
  },

  // "& .MuiTableCell-root": {
  //   alignItems: "center",
  //   borderBottom: `1px solid ${theme.palette.divider}`,
  //   display: "flex",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  //   whiteSpace: "nowrap",
  // },

  "& .MuiTableRow-root": {
    // backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
}));

export const GridHeadRoot = styled((props: TableHeadProps) => (
  <TableHead component="div" {...props} />
))(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

export const Overlay = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
}));
