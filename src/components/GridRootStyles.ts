import { makeStyles, Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";

export const useStyles = makeStyles(
  (theme: Theme) => {
    // const borderColor = theme.palette.primary.main;
    // getThemePaletteMode(theme.palette) === "light"
    //   ? lighten(muiStyleAlpha(theme.palette.divider, 1), 0.88)
    //   : darken(muiStyleAlpha(theme.palette.divider, 1), 0.68);

    const gridStyle = createStyles({
      root: {
        flex: 1,
        boxSizing: "border-box",
        position: "relative",
        // border: `1px solid ${borderColor}`,
        // borderRadius: theme.shape.borderRadius,
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
          // backgroundColor: muiStyleAlpha(
          //   theme.palette.background.default,
          //   theme.palette.action.disabledOpacity
          // ),
        },
      },
    });

    return gridStyle;
  },
  { name: "Grid" }
);
