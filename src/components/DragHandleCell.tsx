import { forwardRef, HTMLAttributes } from "react";
import { DragIndicator } from "@material-ui/icons";
import { createStyles, makeStyles, TableCell } from "@material-ui/core";
import clsx from "clsx";

type Anchor = "left" | "right" | "top" | "bottom";

const useStyles = makeStyles(() =>
  createStyles({
    root: (props: { anchor: Anchor }) => ({
      cursor: "grab",
      // position: "absolute",
      top: "30%",
      [props.anchor]: 0,
    }),
  })
);

export interface DragHandleCellProps
  extends HTMLAttributes<HTMLTableCellElement> {
  IconComponent?: () => JSX.Element;
  anchor?: Anchor;
}

type Props = DragHandleCellProps;

export const DragHandleCell = forwardRef<HTMLTableCellElement, Props>(
  function DragHandle(props, ref) {
    const {
      IconComponent = DragIndicator,
      anchor = "left",
      className,
      ...divProps
    } = props;
    const classes = useStyles({ anchor });

    return (
      <TableCell
        {...divProps}
        className={clsx(className, classes.root)}
        ref={ref}
      >
        <IconComponent fontSize={"small"} />
      </TableCell>
    );
  }
);

export default DragHandleCell;
