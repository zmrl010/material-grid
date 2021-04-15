import { jsx as _jsx } from "react/jsx-runtime";
import { TableHead, TableRow } from "@material-ui/core";
import { SortableHeaderCell } from "./SortableHeaderCell";
export function GridHeader(props) {
    const { headerGroups, components } = props;
    return (_jsx(TableHead, { children: headerGroups.map((headerGroup) => (_jsx(TableRow, Object.assign({}, headerGroup.getHeaderGroupProps(), { children: headerGroup.headers.map((column) => (_jsx(SortableHeaderCell, Object.assign({ column: column, SortLabel: components.SortLabel }, column.getHeaderProps()), void 0))) }), void 0))) }, void 0));
}
export default GridHeader;
//# sourceMappingURL=GridHeader.js.map