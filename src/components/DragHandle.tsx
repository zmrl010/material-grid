import { forwardRef, HTMLAttributes } from "react";
import { DragIndicator } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

type Anchor = "left" | "right" | "top" | "bottom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: (props: { anchor: Anchor }) => ({
      cursor: "grab",
      position: "absolute",
      top: "30%",
      [props.anchor]: 0,
      // opacity: 0.3,
      // "&:hover": {
      //   opacity: 1,
      // },
    }),
  })
);

export interface DragHandleProps extends HTMLAttributes<HTMLDivElement> {
  IconComponent?: () => JSX.Element;
  anchor?: Anchor;
}

type Props = DragHandleProps;

export const DragHandle = forwardRef<HTMLDivElement, Props>(function DragHandle(
  props,
  ref
) {
  const {
    IconComponent = DragIndicator,
    anchor = "left",
    className,
    ...divProps
  } = props;
  const classes = useStyles({ anchor });

  return (
    <div {...divProps} className={clsx(className, classes.root)} ref={ref}>
      <IconComponent fontSize={"small"} />
    </div>
  );
});

export default DragHandle;
