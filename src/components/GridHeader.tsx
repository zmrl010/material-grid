import { TableHead, TableRow } from "@material-ui/core";
import { HeaderGroup } from "react-table";
import { BaseType, GridComponents } from "../types";
import { SortableHeaderCell } from "./SortableHeaderCell";

export interface GridHeaderProps<D extends BaseType = {}> {
  headerGroups: HeaderGroup<D>[];
  components: Pick<GridComponents, "SortLabel">;
}

type Props<D extends BaseType = {}> = GridHeaderProps<D>;

export function GridHeader<D extends BaseType = {}>(props: Props<D>) {
  const { headerGroups, components } = props;

  return (
    <TableHead>
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <SortableHeaderCell
              column={column}
              SortLabel={components.SortLabel}
              {...column.getHeaderProps()}
            />
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

export default GridHeader;
