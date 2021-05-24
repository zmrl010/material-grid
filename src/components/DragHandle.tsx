import { CSSProperties } from "react";
import { DragIndicator } from "@material-ui/icons";
import { createStyles, IconButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useApi } from "../api";

export const DRAG_HANDLE_COLUMN_ID = "drag-handle";

function createDragHandleColumn() {
  return {
    id: DRAG_HANDLE_COLUMN_ID,
    Header: "",
    Cell: DragHandleCell,
    disableSortBy: true,
    width: 25,
  };
}

type DragHandleCellProps = {
  dragHandleProps: DraggableProvidedDragHandleProps;
};

export function DragHandleCell({ dragHandleProps }: DragHandleCellProps) {
  const getApi = useApi();
  const { components } = getApi();
  return <components.DragHandle {...dragHandleProps} />;
}

export const dragHandleColumn = createDragHandleColumn();

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
      <IconButton {...dragHandleProps}>
        <DragIndicator />
      </IconButton>
    </div>
  );
}

export default DragHandle;
