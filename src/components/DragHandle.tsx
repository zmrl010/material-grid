import { CSSProperties } from "react";
import { DragIndicator } from "@mui/icons-material";
import clsx from "clsx";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { classes } from "./GridRoot";

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
  const { className, ...dragHandleProps } = props;

  return (
    <div className={clsx(classes.dragHandle, className)} {...dragHandleProps}>
      <DragIndicator fontSize="large" />
    </div>
  );
}

export default DragHandle;
