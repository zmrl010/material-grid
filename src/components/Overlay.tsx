import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";
import { classes } from "./GridRoot";

export type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(props, ref) {
    const { className, style, ...other } = props;

    return (
      <div
        ref={ref}
        className={clsx(classes.overlay, className)}
        style={style}
        {...other}
      />
    );
  }
);
