import { CSSProperties } from "react";
import { DragIndicator } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import clsx from "clsx";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useGetApi } from "../api";

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
  const getApi = useGetApi();
  const { components } = getApi();
  return <components.DragHandle {...dragHandleProps} />;
}

export const dragHandleColumn = createDragHandleColumn();

export interface DragHandleProps extends DraggableProvidedDragHandleProps {
  className?: string;
  style?: CSSProperties;
}

type Props = DragHandleProps;

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
