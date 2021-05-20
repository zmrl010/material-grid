import {
  createStyles,
  makeStyles,
  TableHead,
  TableHeadProps,
  TableRow,
  Theme,
} from "@material-ui/core";
import { HeaderGroup } from "react-table";
import { BaseType, GridComponents } from "../types";
import { GridHeaderCell } from "./GridHeaderCell";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      // paddingRight: "16px",
      boxSizing: "border-box",
      display: "flex",
    },
  })
);

// TODO pass TableHeadProps to TableHead properly
export interface GridHeaderProps<D extends BaseType = BaseType>
  extends TableHeadProps {
  headerGroups: HeaderGroup<D>[];
  components: Pick<GridComponents, "SortLabel">;
  tableHeadRef: (element: HTMLElement | null) => void;
}

type Props<D extends BaseType = BaseType> = GridHeaderProps<D>;

export function GridHeader<D extends BaseType = BaseType>(props: Props<D>) {
  const { headerGroups, components, tableHeadRef } = props;

  const classes = useStyles();

  return (
    <TableHead
      ref={tableHeadRef}
      component="div"
      classes={{ root: classes.root }}
    >
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
          {headerGroup.headers.map((column) => (
            <GridHeaderCell
              column={column}
              components={components}
              {...column.getHeaderProps()}
            />
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

export default GridHeader;
