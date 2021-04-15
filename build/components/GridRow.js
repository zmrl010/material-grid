import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { 
// createStyles,
// makeStyles,
TableCell, TableRow, } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { DragHandle } from "./DragHandle";
// const useStyles = makeStyles((theme) => createStyles({}));
export const ItemTypes = {
    ROW: "row",
};
/**
 * Datatable Row with custom functionality
 * @param props
 * @returns
 */
function GridRow(props) {
    const { row, isDragDisabled } = props;
    return (_jsx(Draggable, Object.assign({ draggableId: row.id, index: row.index, isDragDisabled: isDragDisabled }, { children: (provided) => (_jsxs(TableRow, Object.assign({ ref: provided.innerRef }, row.getRowProps(Object.assign(Object.assign({}, provided.draggableProps), { style: Object.assign(Object.assign({}, provided.draggableProps.style), { position: "relative" }) })), { children: [!isDragDisabled && _jsx(DragHandle, Object.assign({}, provided.dragHandleProps), void 0),
                row.cells.map((cell) => (_jsx(TableCell, Object.assign({}, cell.getCellProps(), { children: cell.render("Cell") }), void 0)))] }), void 0)) }), void 0));
}
export default GridRow;
//# sourceMappingURL=GridRow.js.map