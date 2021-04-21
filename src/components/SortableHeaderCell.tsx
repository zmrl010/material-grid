import { ReactNode } from "react";
import { HeaderGroup } from "react-table";
import { TableCell } from "@material-ui/core";

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

export type SortLabelProps = {
  active: boolean;
  direction?: SortDirection;
  children?: ReactNode;
};

export interface SortableHeaderCellProps<D extends object = {}> {
  column: HeaderGroup<D>;
  SortLabel: (props: SortLabelProps) => JSX.Element;
}

export function SortableHeaderCell<D extends object = {}>(
  props: SortableHeaderCellProps<D>
) {
  const { column, SortLabel } = props;

  const sortDirection = getSortDirection(column);

  // FIXME label shows even when col doesnt sort
  return (
    <TableCell {...column.getHeaderProps()} sortDirection={sortDirection}>
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
    </TableCell>
  );
}
