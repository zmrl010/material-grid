import { makeStyles, Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";

export const useStyles = makeStyles(
  (theme: Theme) => {
    const gridStyle = createStyles({
      root: {
        flex: 1,
        boxSizing: "border-box",
        position: "relative",
        color: theme.palette.text.primary,
        ...theme.typography.body2,
        outline: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "& *, & *::before, & *::after": {
          boxSizing: "inherit",
        },
        "& .Grid-autoHeight": {
          height: "auto",
        },
        "& .Grid-main": {
          position: "relative",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        },
        "& .Grid-overlay": {
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
      },
    });
    return gridStyle;
  },
  { name: "Grid" }
);
