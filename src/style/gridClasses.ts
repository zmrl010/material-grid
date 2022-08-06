import { generateUtilityClasses } from "@mui/material";

export interface GridClasses {
  body: string;
  cell: string;
  columnHeader: string;
  columnHeaders: string;
  footer: string;
  main: string;
  root: string;
  row: string;
}

export type GridClassKey = keyof GridClasses;

export const gridClasses = generateUtilityClasses<GridClassKey>("mg", [
  "body",
  "cell",
  "columnHeader",
  "columnHeaders",
  "footer",
  "main",
  "root",
  "row",
]);
