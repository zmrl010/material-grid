# material-grid

A dynamic data table component, rendered with MUI's `Table` components. It uses `react-table` to allow for powerful features like sorting and filtering.

## Install

This package currently is not in the npm registry. To install it, run `npm install https://github.com/zmrl010/material-grid.git`.

## Usage

Start by importing the `MaterialGrid` component and supplying it `data` and `columns` props.

This will use the default configuration and any additional config should be supplied as properties to this component as well.

Most of the options are passed directly to `useTable` from the [react-table](https://react-table.tanstack.com/docs/quick-start) library, including plugins. Note that by passing a plugins array, you replace the default list so be sure to include all the plugins you want.

## Links

- [MUI Table Docs](https://mui.com/material-ui/react-table/)
- [react-table Docs](https://react-table.tanstack.com/docs/overview)
