import { ReactNode } from "react";
import { HeaderGroup } from "react-table";
import {
  TableCell,
  TableCellClassKey,
  TableCellProps,
  TableSortLabelClassKey,
} from "@material-ui/core";
import { BaseType, ClassKeyMap, ExtendClassKey } from "../types";

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

export interface SortableHeaderCellProps<D extends BaseType = BaseType>
  extends TableCellProps {
  column: HeaderGroup<D>;
  SortLabel: (props: SortLabelProps) => JSX.Element;
  classes?: ClassKeyMap<GridHeaderCellClassKey>;
}

export function SortableHeaderCell<D extends BaseType = BaseType>(
  props: SortableHeaderCellProps<D>
) {
  const { column, SortLabel, classes = {} } = props;

  const sortDirection = getSortDirection(column);

  // FIXME label shows even when col doesnt sort
  return (
    <TableCell
      {...column.getHeaderProps()}
      sortDirection={sortDirection}
      classes={{
        head: classes.head,
      }}
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
