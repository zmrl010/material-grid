import { ForwardedRef, forwardRef } from "react";
import { Table, TableProps } from "@mui/material";
import clsx from "clsx";
import { useStyles } from "./GridRootStyles";

export type GridRootProps = TableProps;

export const GridRoot = forwardRef(function GridRoot(
  props: GridRootProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { className, ...tableProps } = props;
  const classes = useStyles();

  return (
    <Table
      ref={ref}
      tabIndex={0}
      component={"div"}
      className={clsx(classes.root, className)}
      {...tableProps}
    />
  );
});

export default GridRoot;
