import { CSSProperties } from "react";
import { DragIndicator } from "@mui/icons-material";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Box } from "@mui/material";

export interface DragHandleProps extends DraggableProvidedDragHandleProps {
  className?: string;
  style?: CSSProperties;
}

type Props = DragHandleProps;

/**
 * Icon-button handle for drag and drop
 * @param props
 * @returns
 */
export function DragHandle(props: Props) {
  return (
    <Box sx={{ display: "flex" }} {...props}>
      <DragIndicator />
    </Box>
  );
}

export default DragHandle;
