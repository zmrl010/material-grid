import { ForwardedRef, forwardRef, memo, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Table, TableProps, TableContainer, Paper } from "@mui/material";
import { useBoundingRect, useScrollbarSizeDetector } from "../hooks";
import GridBody from "./GridBody";
import GridHeader from "./GridHeader";

export interface GridRootProps extends TableProps {
  loading?: boolean;
}

const GridRootBase = forwardRef(function GridRootBase(
  { loading, ...props }: GridRootProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [headerBoundingRect, headerRef] = useBoundingRect();

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const scrollbarSize = useScrollbarSizeDetector(bodyRef);

  const headerWidth = `calc(100% - ${scrollbarSize}px)`;
  const bodyHeight = headerBoundingRect
    ? `calc(100% - ${headerBoundingRect.height || 0}px)`
    : "100%";

  return (
    <TableContainer component={Paper}>
      <Table ref={ref} tabIndex={0} component={"div"} {...props}>
        <GridHeader width={headerWidth} ref={headerRef} />
        <GridBody loading={loading} height={bodyHeight} ref={bodyRef} />
      </Table>
    </TableContainer>
  );
});

export const GridRoot = memo(
  styled(GridRootBase, {
    name: "Grid",
    slot: "Root",
  })(({ theme }) => ({
    boxSizing: "border-box",
    color: theme.palette.text.primary,
    outline: "none",
    height: "100vh",
    display: "table",
    flexFlow: "column nowrap",
    overflow: "auto",

    "& *, & *::before, & *::after": {
      boxSizing: "inherit",
    },
  }))
);

export default GridRoot;
