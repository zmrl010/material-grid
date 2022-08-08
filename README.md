<h1 align="center">
  @zmrl/material-grid
</h1>
<h4 align="center">
  Feature-rich datagrid component
</h4>

Powered by:

- [TanStack Table](https://tanstack.com/table/v8)
- [Material UI](https://mui.com/material-ui/getting-started/overview/)

## Getting Started

Install with your favorite package manager

```shell
npm add @zmrl/material-grid

# or...

yarn add @zmrl/material-grid

# or...

pnpm add @zmrl/material-grid
```

If you've used `@tanstack/react-table` before, the setup is almost identical.
You need to setup `ColumnDef`s to map your data in the table. This package
re-exports a `columnHelper` factory from `@tanstack/react-table`, called
`createColumnHelper`. You can use the helper to setup your `ColumnDef`s or
provide an array of your own.

```ts
// columns.ts

import { createColumnHelper } from "@zmrl/material-grid"

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  bio: string;
  createdOn: Date; 
  modifiedOn: Date;
}

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor("id", { header: "#", size: 100 }),
  columnHelper.accessor("firstName", { header: "First Name", size: 100 }),
  columnHelper.accessor("lastName", { header: "Last Name", size: 100 }),
  columnHelper.accessor("age", { header: "Age", size: 65 }),
  columnHelper.accessor("bio", { header: "Bio", size: 800 }),
  columnHelper.accessor("createdOn", {
    header: "Created On",
    cell: (props) => props.getValue().toLocaleDateString(),
    size: 100,
  }),
  columnHelper.accessor("modifiedOn", {
    header: "Modified On",
    cell: (props) => props.getValue().toLocaleDateString(),
    size: 100,
  }),
];
```

Pass these columns and your data to the `MaterialGrid` component
and all your data will be rendered as rows per your column definitions.

```tsx
import { MaterialGrid } from "@zmrl/material-grid"

const data: Person[] = [ 
/** 
 * rows 
 * and 
 * rows
 * of 
 * data 
 */
]

const columns = [
/**
 * your column defs
 */
]

function App() {
  return (
    <MaterialGrid data={data} columns={columns} />
  )
}
```