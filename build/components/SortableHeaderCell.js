import { jsx as _jsx } from "react/jsx-runtime";
import { TableCell } from "@material-ui/core";
function getSortDirection({ isSorted, isSortedDesc, }) {
    if (isSorted) {
        return isSortedDesc ? "desc" : "asc";
    }
    return undefined;
}
export function SortableHeaderCell(props) {
    const { column, SortLabel } = props;
    const sortDirection = getSortDirection(column);
    return (_jsx(TableCell, Object.assign({}, column.getHeaderProps(), { sortDirection: sortDirection }, { children: column.canSort ? (_jsx(SortLabel, Object.assign({ active: column.isSorted, direction: sortDirection }, column.getSortByToggleProps(), { children: column.render("Header") }), void 0)) : (column.render("Header")) }), void 0));
}
//# sourceMappingURL=SortableHeaderCell.js.map