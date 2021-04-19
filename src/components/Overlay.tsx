import { createStyles, makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
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
