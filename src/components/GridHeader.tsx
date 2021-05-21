import {
  createStyles,
  makeStyles,
  TableHead,
  TableHeadProps,
  TableRow,
  Theme,
} from "@material-ui/core";
import clsx from "clsx";
import { HeaderGroup } from "react-table";
import { useApi } from "../api";
import { BaseType, GridComponents } from "../types";
import { GridHeaderCell } from "./GridHeaderCell";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      boxSizing: "border-box",
      display: "flex",
    },
  })
);

// TODO pass TableHeadProps to TableHead properly
export interface GridHeaderProps extends TableHeadProps {
  tableHeadRef: (element: HTMLElement | null) => void;
}

type Props = GridHeaderProps;

export function GridHeader<D extends BaseType = BaseType>(props: Props) {
  const { tableHeadRef, className, ...gridHeadProps } = props;

  const getApi = useApi<D>();

  const classes = useStyles();

  const { headerGroups } = getApi().instance;

  return (
    <TableHead
      {...gridHeadProps}
      className={clsx("Grid-header", className, classes.root)}
      component="div"
      ref={tableHeadRef}
    >
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
          {headerGroup.headers.map((column) => (
            <GridHeaderCell column={column} {...column.getHeaderProps()} />
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

export default GridHeader;
