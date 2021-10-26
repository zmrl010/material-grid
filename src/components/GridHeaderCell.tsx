import { HeaderGroup } from "react-table";
import {
  TableCellClassKey,
  TableCellProps,
  TableSortLabelClassKey,
} from "@mui/material";
import { BaseType, ClassKeyMap, ExtendClassKey } from "../types";
import { useApiRef, useGridComponents } from "../api";
import GridCell from "./GridCell";

/**
 *
 * @param param0
 * @returns
 */
function getSortDirection(column: {
  isSorted?: boolean;
  isSortedDesc?: boolean;
}) {
  const { isSorted, isSortedDesc } = column;

  if (isSorted) {
    return isSortedDesc ? "desc" : "asc";
  }
  return undefined;
}

type HeaderCellSortLabelClassKey = ExtendClassKey<
  "sortLabel",
  TableSortLabelClassKey
>;

export type GridHeaderCellClassKey =
  | TableCellClassKey
  | HeaderCellSortLabelClassKey;

export interface GridHeaderCellProps<D extends BaseType = BaseType>
  extends TableCellProps {
  column: HeaderGroup<D>;
  classes?: ClassKeyMap<GridHeaderCellClassKey>;
}

export function GridHeaderCell<D extends BaseType = BaseType>(
  props: GridHeaderCellProps<D>
) {
  const { column } = props;

  const apiRef = useApiRef<D>();
  const { SortLabel } = useGridComponents(apiRef);

  const sortDirection = getSortDirection(column);

  // FIXME label shows even when col doesnt sort
  return (
    <GridCell
      {...column.getHeaderProps()}
      sortDirection={sortDirection}
      variant="head"
    >
      {column.canSort ? (
        <SortLabel
          active={column.isSorted}
          direction={sortDirection}
          {...column.getSortByToggleProps()}
        >
          {column.render("Header")}
        </SortLabel>
      ) : (
        column.render("Header")
      )}
    </GridCell>
  );
}
