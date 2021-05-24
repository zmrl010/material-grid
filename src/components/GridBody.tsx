import { CSSProperties } from "react";
import { Droppable } from "react-beautiful-dnd";
import { createStyles, makeStyles, TableBody } from "@material-ui/core";
import clsx from "clsx";

import GridRow from "./GridRow";
import { useApi } from "../api";
import type { Id } from "../types";

const useStyles = makeStyles(() =>
  createStyles({
    root: (props: { height?: string | number }) => ({
      position: "relative",
      height: props.height,
      width: "100%",
      display: "table",
      boxSizing: "border-box",
      overflow: "hidden auto",
    }),
    middleBlock: {
      height: "100%",
      display: "flex",
    },
    innerBlock: {
      overflow: "hidden",
      flexGrow: 1,
    },
  })
);

export interface GridBodyProps {
  className?: string;
  style?: CSSProperties;
  height?: string | number;
  loading: boolean;
}

type Props = GridBodyProps;

export function GridBody<D extends Id = Id>(props: Props) {
  const { loading, className, style, height } = props;

  const getApi = useApi<D>();

  const classes = useStyles({ height });

  const { instance, components, hasRows } = getApi();
  const {
    className: tableBodyClassName,
    style: tableBodyStyle,
    role,
  } = instance.getTableBodyProps();

  const showNoRows = !loading && !hasRows();

  return (
    <Droppable droppableId="table-body">
      {(provided) => (
        <TableBody
          component={"div"}
          role={role}
          className={clsx("Grid-body", className, tableBodyClassName)}
          classes={{ root: classes.root }}
          style={{ ...style, ...tableBodyStyle }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={classes.middleBlock}>
            <div className={classes.innerBlock}>
              {showNoRows && <components.NoRowsOverlay />}
              {loading && <components.LoadingOverlay />}
              {instance.rows.map((row) => {
                instance.prepareRow(row);
                return (
                  <GridRow
                    {...row.getRowProps()}
                    id={row.id}
                    index={row.index}
                    cells={row.cells}
                  />
                );
              })}
            </div>
          </div>
        </TableBody>
      )}
    </Droppable>
  );
}

export default GridBody;
