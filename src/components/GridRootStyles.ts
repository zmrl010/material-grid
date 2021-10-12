import { Theme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { createStyles } from "@mui/styles";
import { theme } from "../theme";

export const useStyles = makeStyles(
  (theme: Theme) => {
    const borderColor = theme.palette.divider;
    const border = `1px solid ${borderColor}`;

    const gridStyle = createStyles({
      root: {
        boxSizing: "border-box",
        color: theme.palette.text.primary,
        ...theme.typography.body2,
        outline: "none",
        height: "100%",
        display: "block",
        overflow: "auto",

        "& *, & *::before, & *::after": {
          boxSizing: "inherit",
        },
        "& .Grid-autoHeight": {
          height: "auto",
        },
        "& .Grid-head": {
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: theme.palette.background.paper,
          display: "flex",
        },
        "& .Grid-body": {
          overflowY: "auto",
          overflowX: "hidden",
          display: "block",
          position: "relative",
        },
        "& .Grid-overlay": {
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
        },
        "& .Grid-cell": {
          display: "flex",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          borderBottom: border,
          alignItems: "center",
        },
        "& .Grid-row": {
          backgroundColor: theme.palette.background.paper,
          // width: "fit-content",
        },
        "& .Grid-row-dragging": {
          display: "table",
        },
        "& .Grid-dragHandle": {
          display: "flex",
        },
      },
    });
    return gridStyle;
  },
  { name: "Grid", defaultTheme: theme }
);
