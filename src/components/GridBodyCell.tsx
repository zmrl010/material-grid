import { Box } from "@mui/material";
import { type ReactNode } from "react";
import GridCell from "./GridCell";

export interface GridBodyCellProps {
  height?: number;
  width?: number;
  children: ReactNode;
}

export default function GridBodyCell({
  height,
  width,
  children,
}: GridBodyCellProps): JSX.Element {
  return (
    <GridCell
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
      }}
    >
      <Box overflow="hidden" textOverflow="ellipsis">
        {children}
      </Box>
    </GridCell>
  );
}
