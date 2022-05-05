import { TableHead, type TableHeadProps, TableRow } from "@mui/material";
import { forwardRef } from "react";
import type { HeaderGroup } from "react-table";
import GridHeaderCell from "./GridHeaderCell";

interface GridHeaderProps extends TableHeadProps {
  width: number | string;
  headerGroups: HeaderGroup[];
}

function HeaderRow({ headerGroup }: { headerGroup: HeaderGroup }) {
  return (
    <TableRow
      {...headerGroup.getHeaderGroupProps()}
      key={headerGroup.id}
      component="div"
    >
      {headerGroup.headers.map((column) => (
        <GridHeaderCell
          column={column}
          {...column.getHeaderProps()}
          key={column.id}
        />
      ))}
    </TableRow>
  );
}

const GridHeader = forwardRef<HTMLDivElement, GridHeaderProps>(
  function GridHeader({ width, headerGroups, ...props }, ref) {
    return (
      <TableHead component="div" ref={ref} sx={{ width }} {...props}>
        {headerGroups.map((headerGroup) => (
          <HeaderRow key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </TableHead>
    );
  }
);

export default GridHeader;
