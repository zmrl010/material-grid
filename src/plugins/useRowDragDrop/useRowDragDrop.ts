/**
 * WIP module for plugin to facilitate drag and drop functionality
 */
import { useEffect } from "react";
import { Hooks, Meta, Row, TableInstance } from "react-table";
import { DRAG_HANDLE_COLUMN_ID } from "./column";

export interface UseRowDragDropOptions {
  enableRowDragDrop?: boolean;
}

export interface UseRowDragDropRowProps {
  dragDropEnabled: boolean;
}

export function useRowDragDrop<D extends object = {}>(hooks: Hooks<D>) {
  hooks.prepareRow.push(prepareRow);
  hooks.useInstance.push(useInstance);
}

function prepareRow<D extends object = {}>(row: Row<D>, { instance }: Meta<D>) {
  row.dragDropEnabled = instance.enableRowDragDrop ?? false;
}

function useInstance<D extends object = {}>(instance: TableInstance<D>) {
  const { enableRowDragDrop, toggleHideColumn } = instance;
  useEffect(() => {
    toggleHideColumn(DRAG_HANDLE_COLUMN_ID, !enableRowDragDrop);
  }, [enableRowDragDrop, toggleHideColumn]);
}

useRowDragDrop.pluginName = "useRowDragDrop";
