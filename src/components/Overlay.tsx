import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      position: "absolute",
      top: 10, // FIXME no rows positioning (set top offset for now)
      left: 0,
      right: 0,
      bottom: 0,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(props, ref) {
    const { className, style, ...other } = props;
    const classes = useStyles();

    return (
      <div
        ref={ref}
        className={clsx(classes.root, className)}
        style={style}
        {...other}
      />
    );
  }
);
