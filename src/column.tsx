// import { Column } from "react-table";
// import ActionButtonGroup from "../DataGrid/ActionButtonGroup";
// import { RecordActionMap } from "../DataGrid/types";

// function makeCompletedColumn() {
//   return {
//     field: "completed",
//     headerName: "Completed",
//     width: 100,
//     renderCell: (params: any) => {},
//   };
// }

// /**
//  * Constructs a ColDef object for column for action items
//  * @param removeFunc function to call when clicked
//  */
// export function makeActionsColumn<T extends GridRowModel>(
//   actions: RecordActionMap<T> = {}
// ): Column {
//   return {
//     field: "action",
//     headerName: " ",
//     disableClickEventBubbling: true,
//     disableColumnMenu: true,
//     sortable: false,
//     align: "right",
//     width: 150,
//     renderCell: (params) => (
//       <ActionButtonGroup actions={actions} row={params.row as T} />
//     ),
//   };
// }
export {};
