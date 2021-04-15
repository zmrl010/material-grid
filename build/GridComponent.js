var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTable, useSortBy, useRowSelect, useFlexLayout, usePagination, } from "react-table";
import { useCallback } from "react";
import { useImmer } from "use-immer";
import { GridRoot } from "./components";
import { useComponents } from "./hooks";
import GridHeader from "./components/GridHeader";
import GridProvider from "./components/GridProvider";
import GridBody from "./components/GridBody";
function getRowId(row) {
    return row.id.toString();
}
export function Grid(props) {
    const { columns, data, disableSortBy = false, defaultCanSort = true, enableRowDragDrop = false, loading = false, components: propComponents } = props, tableProps = __rest(props, ["columns", "data", "disableSortBy", "defaultCanSort", "enableRowDragDrop", "loading", "components"]);
    const [records, updateRecords] = useImmer(data);
    const components = useComponents(propComponents);
    const instance = useTable({
        columns,
        data: records,
        disableSortBy,
        defaultCanSort,
        getRowId,
    }, useSortBy, usePagination, useRowSelect, useFlexLayout);
    const { getTableProps, headerGroups, rows } = instance;
    const moveRow = useCallback((sourceIndex, destinationIndex) => {
        updateRecords((draftRecords) => {
            const [record] = draftRecords.splice(sourceIndex, 1);
            // FIXME record type
            draftRecords.splice(destinationIndex, 0, record);
        });
    }, [updateRecords]);
    const onDragEnd = useCallback((result) => {
        if (result.destination) {
            moveRow(result.source.index, result.destination.index);
        }
    }, [moveRow]);
    return (_jsx(GridProvider, Object.assign({ onDragEnd: onDragEnd, instance: instance, components: components, rowDragDropDisabled: !enableRowDragDrop }, { children: _jsxs(GridRoot, Object.assign({}, getTableProps(), tableProps, { children: [_jsx(GridHeader, { components: components, headerGroups: headerGroups }, void 0),
                _jsx(GridBody, { showNoRows: !loading && rows.length === 0, isDragDisabled: !enableRowDragDrop, rows: rows, loading: loading, NoRowsOverlay: components.NoRowsOverlay, LoadingOverlay: components.LoadingOverlay }, void 0)] }), void 0) }), void 0));
}
export default Grid;
//# sourceMappingURL=GridComponent.js.map