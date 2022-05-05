# material-grid

An extension of material-ui `Table` components coupled with `react-table` to deliver a feature-rich data grid component.
Similar to the material-ui data-grid component available from the lab packages.

Install this in your project and import the Grid component to use where needed.

## Install

This package currently is not in the npm registry. To install it, run `npm install https://github.com/zmrl010/material-grid.git`.

## Usage

Start by importing the `MaterialGrid` component and supplying it `data` and `columns` props.

This will use the default configuration and any additional config should be supplied as properties to this component as well.

Most of the options are passed directly to `useTable` from the [react-table](https://react-table.tanstack.com/docs/quick-start) library, including plugins. Note that by passing a plugins array, you replace the default list so be sure to include all the plugins you want.

## Links

- [MUI Table Docs](https://mui.com/material-ui/react-table/)
- [react-table Docs](https://react-table.tanstack.com/docs/overview)
