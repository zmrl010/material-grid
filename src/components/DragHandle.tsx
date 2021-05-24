import { HTMLAttributes } from "react";
import { DragIndicator } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { capitalize } from "lodash";

type Anchor = "left" | "right" | "top" | "bottom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: { anchor: Anchor }) => ({
      display: "flex",
      [`margin${capitalize(props.anchor)}`]: -theme.spacing(2),
    }),
  })
);

export interface DragHandleProps {
  anchor?: Anchor;
}

type Props = DragHandleProps &
  HTMLAttributes<HTMLDivElement> &
  DraggableProvidedDragHandleProps;

export function DragHandle(props: Props) {
  const { anchor = "left", className, ...divProps } = props;
  const classes = useStyles({ anchor });

  return (
    <div
      className={clsx("Grid-drag-handle", className, classes.root)}
      {...divProps}
    >
      <DragIndicator fontSize={"small"} />
    </div>
  );
}

export default DragHandle;
