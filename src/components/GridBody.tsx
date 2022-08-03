import { type StyledComponent } from "@emotion/styled";
import {
  type TableBodyProps,
  TableBody,
  tableCellClasses,
  styled,
} from "@mui/material";
import { type RowData, type Table } from "@tanstack/react-table";
import { type CSSProperties } from "react";
import { COMPONENT_NAME } from "../constants";
import getBorderColor from "../styles/getBorderColor";
import GridBodyCell from "./GridBodyCell";
import GridCell from "./GridCell";
import GridRow from "./GridRow";

const GridBodyContainer: StyledComponent<TableBodyProps> = styled(
  (props) => <TableBody component="div" {...props} />,
  {
    name: COMPONENT_NAME,
    slot: "Body",
  }
)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  overflow: "auto",

  [`& .${tableCellClasses.root}`]: {
    borderBottom: `1px solid ${getBorderColor(theme)}`,
  },
}));

export interface GridBodyProps<TData extends RowData> {
  table: Table<TData>;
  rowHeight?: number;
  style?: CSSProperties;
}

export default function GridBody<TData extends RowData>({
  table,
  style,
  rowHeight,
}: GridBodyProps<TData>) {
  const totalSize = table.getTotalSize();
  const remainingWidth = `calc(100% - ${totalSize}px)`;

  return (
    <GridBodyContainer style={style}>
      {table.getRowModel().rows.map((row) => (
        <GridRow
          sx={{
            minHeight: rowHeight,
            maxHeight: rowHeight,
          }}
          key={row.id}
        >
          {row.getVisibleCells().map((cell) => (
            <GridBodyCell key={cell.id} cell={cell} rowHeight={rowHeight} />
          ))}
          <GridCell
            sx={{
              width: remainingWidth,
            }}
          >
            {" "}
          </GridCell>
        </GridRow>
      ))}
    </GridBodyContainer>
  );
}
