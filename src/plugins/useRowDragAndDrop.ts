import { Hooks, Row } from "react-table";

const pluginName = useRowDragAndDrop;

export function useRowDragAndDrop(hooks: Hooks) {
  hooks.prepareRow.push(prepareRow);
}

useRowDragAndDrop.pluginName = pluginName;

function prepareRow<D extends object = {}>(row: Row<D>) {
  console.log(row);
}
