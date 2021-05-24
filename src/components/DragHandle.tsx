import { CSSProperties } from "react";
import { DragIndicator } from "@material-ui/icons";
import { createStyles, IconButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

export interface DragHandleProps extends DraggableProvidedDragHandleProps {
  className?: string;
  style?: CSSProperties;
}

type Props = DragHandleProps;

export function DragHandle(props: Props) {
  const { className, style, ...dragHandleProps } = props;
  const classes = useStyles();

  return (
    <div
      className={clsx("Grid-drag-handle", className, classes.root)}
      style={style}
    >
      <IconButton {...dragHandleProps} size="small">
        <DragIndicator />
      </IconButton>
    </div>
  );
}

export default DragHandle;
