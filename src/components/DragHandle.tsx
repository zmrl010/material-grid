import { CSSProperties } from "react";
import { DragIndicator } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import clsx from "clsx";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

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
  const { className, style, ...dragHandleProps } = props;

  return (
    <div className={clsx("Grid-dragHandle", className)} style={style}>
      <IconButton {...dragHandleProps}>
        <DragIndicator />
      </IconButton>
    </div>
  );
}

export default DragHandle;
