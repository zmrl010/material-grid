/**
 * WIP module for plugin to facilitate drag and drop functionality
 * TODO append column
 * TODO useInstance for config and related settings
 */
import { Hooks, Row } from "react-table";

const pluginName = useRowDragAndDrop;

export function useRowDragAndDrop(hooks: Hooks) {
  hooks.prepareRow.push(prepareRow);
}

useRowDragAndDrop.pluginName = pluginName;

function prepareRow<D extends object = {}>(row: Row<D>) {
  console.log(row);
}

// function makeDragColumn(DragHandle: () => JSX.Element) {
//   return {
//     id: "drag-handle",
//     Header: "",
//     Cell: DragHandle,
//     disableSortBy: true,
//   };
// }

// function prependDragColumn(columns: Column[]) {
//   return [makeDragColumn(), ...columns];
// }
