import { ReactNode } from "react";
import { HeaderGroup } from "react-table";
import {
  TableCell,
  TableCellClassKey,
  TableCellProps,
  TableSortLabelClassKey,
} from "@material-ui/core";
import {
  BaseType,
  ClassKeyMap,
  ExtendClassKey,
  GridComponents,
} from "../types";
import { useApi } from "../api";

type SortDirection = "desc" | "asc";

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
  const { column, classes = {} } = props;

  const getApi = useApi();

  const { SortLabel } = getApi().components;

  const sortDirection = getSortDirection(column);

  // FIXME label shows even when col doesnt sort
  return (
    <TableCell
      {...column.getHeaderProps()}
      sortDirection={sortDirection}
      component="div"
      classes={classes}
    >
      {column.canSort ? (
        <SortLabel
          active={column.isSorted}
          direction={sortDirection}
          {...column.getSortByToggleProps()}
          classes={classes}
        >
          {column.render("Header")}
        </SortLabel>
      ) : (
        column.render("Header")
      )}
    </TableCell>
  );
}
