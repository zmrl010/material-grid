/**
 * WIP module for plugin to facilitate drag and drop functionality
 * TODO append column
 * TODO useInstance for config and related settings
 */
import { useEffect } from "react";
import { Hooks, Meta, Row, TableInstance } from "react-table";
import { DRAG_HANDLE_COLUMN_ID } from "../../components";
// import { dragHandleColumn } from "./dragHandleColumn";

export function useRowDragDrop<D extends object = {}>(hooks: Hooks<D>) {
  hooks.prepareRow.push(prepareRow);
  hooks.useInstance.push(useInstance);
}

function prepareRow<D extends object = {}>(row: Row<D>, { instance }: Meta<D>) {
  row.dragDropEnabled = instance.enableRowDragDrop ?? false;
}

function useInstance<D extends object = {}>(instance: TableInstance<D>) {
  const { enableRowDragDrop } = instance;
  useEffect(() => {
    instance.toggleHideColumn(
      DRAG_HANDLE_COLUMN_ID,
      !instance.enableRowDragDrop
    );
  }, [enableRowDragDrop]);
}

useRowDragDrop.pluginName = "useRowDragDrop";
