import { CSSProperties } from "react";
import { DragIndicator } from "@mui/icons-material";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Box } from "@mui/material";

export interface DragHandleProps extends DraggableProvidedDragHandleProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * Icon-button handle for drag and drop
 * @param props
 * @returns
 */
export default function DragHandle(props: DragHandleProps) {
  return (
    <Box display="flex" {...props}>
      <DragIndicator />
    </Box>
  );
}
