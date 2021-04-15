import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Droppable } from "react-beautiful-dnd";
import { TableBody } from "@material-ui/core";
import { useApi } from "../api";
import GridRow from "./GridRow";
function GridBody(props) {
    const { rows, loading, showNoRows, isDragDisabled, NoRowsOverlay, LoadingOverlay, } = props;
    const apiRef = useApi();
    const { getTableBodyProps, prepareRow } = apiRef.current.instance;
    return (_jsx(Droppable, Object.assign({ droppableId: "table-body" }, { children: (provided) => (_jsxs(TableBody, Object.assign({}, getTableBodyProps(), provided.droppableProps, { ref: provided.innerRef }, { children: [showNoRows && _jsx(NoRowsOverlay, {}, void 0),
                loading && _jsx(LoadingOverlay, {}, void 0),
                rows.map((row) => {
                    prepareRow(row);
                    return (_jsx(GridRow, { row: row, isDragDisabled: isDragDisabled }, row.getRowProps().key));
                })] }), void 0)) }), void 0));
}
export default GridBody;
//# sourceMappingURL=GridBody.js.map