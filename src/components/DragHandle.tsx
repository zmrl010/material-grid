import { CSSProperties, HTMLAttributes } from "react";
import { DragIndicator } from "@material-ui/icons";
import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { capitalize } from "lodash";

type Anchor = "left" | "right" | "top" | "bottom";

const useStyles = makeStyles((theme: Theme) =>
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
