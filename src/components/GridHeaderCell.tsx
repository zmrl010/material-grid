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

type SortDirection = "desc" | "asc";

function getSortDirection({
  isSorted,
  isSortedDesc,
}: {
  isSorted?: boolean;
  isSortedDesc?: boolean;
}) {
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

export type SortLabelProps = {
  active: boolean;
  direction?: SortDirection;
  children?: ReactNode;
  classes?: ClassKeyMap<TableSortLabelClassKey>;
};

export type GridHeaderCellComponents = Pick<GridComponents, "SortLabel">;

export interface GridHeaderCellProps<D extends BaseType = BaseType>
  extends TableCellProps {
  column: HeaderGroup<D>;
  components: GridHeaderCellComponents;
  classes?: ClassKeyMap<GridHeaderCellClassKey>;
}

export function GridHeaderCell<D extends BaseType = BaseType>(
  props: GridHeaderCellProps<D>
) {
  const { column, components, classes = {} } = props;

  const sortDirection = getSortDirection(column);

  // FIXME label shows even when col doesnt sort
  return (
    <TableCell
      {...column.getHeaderProps()}
      sortDirection={sortDirection}
      component="div"
      classes={{
        head: classes.head,
      }}
    >
      {column.canSort ? (
        <components.SortLabel
          active={column.isSorted}
          direction={sortDirection}
          {...column.getSortByToggleProps()}
          classes={classes}
        >
          {column.render("Header")}
        </components.SortLabel>
      ) : (
        column.render("Header")
      )}
    </TableCell>
  );
}
