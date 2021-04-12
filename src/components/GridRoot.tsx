import { forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import { useStyles } from "./GridRootStyles";
import { Table } from "@material-ui/core";

export type GridRootProps = HTMLAttributes<HTMLTableElement>;

export const GridRoot = forwardRef<HTMLTableElement, GridRootProps>(
  function GridRoot(props, ref) {
    const { className, ...other } = props;
    const classes = useStyles();

    return (
      // <div
      <Table
        ref={ref}
        className={clsx(classes.root, className)}
        // role="grid"
        tabIndex={0}
        {...other}
      />
    );
  }
);

export default GridRoot;
