const pluginName = useRowDragAndDrop;
export function useRowDragAndDrop(hooks) {
    hooks.prepareRow.push(prepareRow);
}
useRowDragAndDrop.pluginName = pluginName;
function prepareRow(row) {
    console.log(row);
}
// function getRowProps<D extends object = {}>(
//   props: {},
//   { instance }: { instance: TableInstance<D> }
// ) {}
//# sourceMappingURL=useRowDragAndDrop.js.map