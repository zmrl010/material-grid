/**
 * WIP module for plugin to facilitate drag and drop functionality
 * TODO append column
 * TODO useInstance for config and related settings
 */
import { Hooks, Meta, Row } from "react-table";
// import { dragHandleColumn } from "./dragHandleColumn";

export function useRowDragDrop<D extends object = {}>(hooks: Hooks<D>) {
  hooks.prepareRow.push(prepareRow);
}

function prepareRow<D extends object = {}>(row: Row<D>, { instance }: Meta<D>) {
  row.dragDropEnabled = instance.enableRowDragDrop || false;
}

// function reducer<D extends object>(state);

useRowDragDrop.pluginName = "useRowDragDrop";
