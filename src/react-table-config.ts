import { CSSProperties } from "react";
export interface ColumnStyling {
  style?: CSSProperties;
  className?: string;
}

type Align = "center" | "inherit" | "justify" | "left" | "right";

export interface WithAlign {
  align?: Align;
}

declare module "react-table" {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration
  export interface TableOptions<D extends object>
    extends UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UsePaginationOptions<D>,
      UseResizeColumnsOptions<D>,
      UseSortByOptions<D> {}

  export interface Hooks<D extends object>
    extends UseExpandedHooks<D>,
      UseSortByHooks<D> {}

  export interface TableInstance<D extends object>
    extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<D extends object>
    extends UseColumnOrderState<D>,
      UseExpandedState<D>,
      UseFiltersState<D>,
      UseGlobalFiltersState<D>,
      UsePaginationState<D>,
      UseResizeColumnsState<D>,
      UseSortByState<D> {}

  export interface ColumnInterface<D extends object>
    extends UseFiltersColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D>,
      UseResizeColumnsColumnOptions<D>,
      UseSortByColumnOptions<D>,
      ColumnStyling {}

  export interface ColumnInstance<D extends object>
    extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {}
}
