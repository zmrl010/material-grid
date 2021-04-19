import { Droppable } from "react-beautiful-dnd";
import { TableBody } from "@material-ui/core";
import { Row } from "react-table";

import { useApi } from "../api";
import type { GridComponents, IdType } from "../types";
import GridRow from "./GridRow";

export interface GridBodyProps<D extends IdType = IdType> {
  rows: Row<D>[];
  loading: boolean;
  showNoRows: boolean;
  isDragDisabled: boolean;
  NoRowsOverlay: GridComponents["NoRowsOverlay"];
  LoadingOverlay: GridComponents["LoadingOverlay"];
}

type Props<D extends IdType = IdType> = GridBodyProps<D>;

export function GridBody<D extends IdType = IdType>(props: Props<D>) {
  const {
    rows,
    loading,
    showNoRows,
    isDragDisabled,
    NoRowsOverlay,
    LoadingOverlay,
  } = props;
  const apiRef = useApi<D>();

  const { getTableBodyProps, prepareRow } = apiRef.current.instance;

  return (
    <Droppable droppableId="table-body">
      {(provided) => (
        <TableBody
          {...getTableBodyProps()}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {showNoRows && <NoRowsOverlay />}
          {loading && <LoadingOverlay />}
          {rows.map((row) => {
            prepareRow(row);
            return (
              <GridRow
                {...row.getRowProps()}
                id={row.id}
                index={row.index}
                cells={row.cells}
                isDragDisabled={isDragDisabled}
              />
            );
          })}
        </TableBody>
      )}
    </Droppable>
  );
}

export default GridBody;
