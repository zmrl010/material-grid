import { forwardRef, HTMLAttributes } from "react";
import { Table } from "@material-ui/core";

export type GridRootProps = HTMLAttributes<HTMLTableElement>;

export const GridRoot = forwardRef<HTMLTableElement, GridRootProps>(
  function GridRoot(props, ref) {
    return <Table ref={ref} tabIndex={0} {...props} />;
  }
);

export default GridRoot;
