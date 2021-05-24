import { ForwardedRef, forwardRef } from "react";
import { Table, TableProps } from "@material-ui/core";

export type GridRootProps = TableProps;

export const GridRoot = forwardRef(function GridRoot(
  props: GridRootProps,
  ref: ForwardedRef<HTMLTableElement>
) {
  return (
    <Table
      ref={ref}
      tabIndex={0}
      component={"div"}
      style={{ ...props.style, tableLayout: "auto" }}
      {...props}
    />
  );
});

export default GridRoot;
