import { TableHead, TableHeadProps, TableRow } from "@material-ui/core";
import { HeaderGroup } from "react-table";
import { BaseType, GridComponents } from "../types";
import { SortableHeaderCell } from "./SortableHeaderCell";

// TODO pass TableHeadProps to TableHead properly
export interface GridHeaderProps<D extends BaseType = BaseType>
  extends TableHeadProps {
  headerGroups: HeaderGroup<D>[];
  components: Pick<GridComponents, "SortLabel">;
  tableHeadRef: (element: HTMLElement | null) => void;
}

type Props<D extends BaseType = {}> = GridHeaderProps<D>;

export function GridHeader<D extends BaseType = BaseType>(props: Props<D>) {
  const { headerGroups, components, tableHeadRef } = props;

  return (
    <TableHead ref={tableHeadRef} component="div">
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
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
