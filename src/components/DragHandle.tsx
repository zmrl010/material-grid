import { forwardRef, HTMLAttributes } from "react";
import { DragIndicator } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

type Anchor = "left" | "right" | "top" | "bottom";

const useStyles = makeStyles(() =>
  createStyles({
    root: (props: { anchor: Anchor }) => ({
      cursor: "grab",
      [props.anchor]: 0,
    }),
  })
);

export interface DragHandleProps {
  anchor?: Anchor;
}

type Props = DragHandleProps &
  HTMLAttributes<HTMLDivElement> &
  DraggableProvidedDragHandleProps;

export const DragHandle = forwardRef<HTMLDivElement, Props>(function DragHandle(
  props,
  ref
) {
  const { anchor = "left", className, ...divProps } = props;
  const classes = useStyles({ anchor });

  return (
    <div className={clsx(className, classes.root)} {...divProps} ref={ref}>
      <DragIndicator fontSize={"small"} />
    </div>
  );
});

export default DragHandle;
