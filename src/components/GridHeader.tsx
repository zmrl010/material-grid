import { TableHead, TableRow } from "@material-ui/core";
import { HeaderGroup } from "react-table";
import { GridComponents } from ".";
import { SortableHeaderCell } from "./SortableHeaderCell";

export interface GridHeaderProps<D extends object = {}> {
  headerGroups: HeaderGroup<D>[];
  components: GridComponents;
}

type Props<D extends object = {}> = GridHeaderProps<D>;

export function GridHeader<D extends object = {}>(props: Props<D>) {
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
