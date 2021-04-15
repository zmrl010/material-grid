/// <reference types="react" />
import { GridComponents } from "./types";
export declare function useComponents(propComponents?: Partial<GridComponents>): {
    SortLabel: import("@material-ui/core").ExtendButtonBase<import("@material-ui/core").TableSortLabelTypeMap<{}, "span">>;
    DragHandle: import("react").ForwardRefExoticComponent<import("./components").DragHandleProps & import("react").RefAttributes<HTMLDivElement>>;
    NoRowsOverlay: import("react").ForwardRefExoticComponent<import("./components").NoRowsOverlayProps & import("react").RefAttributes<HTMLDivElement>>;
    LoadingOverlay: import("react").ForwardRefExoticComponent<import("./components").OverlayProps & import("react").RefAttributes<HTMLDivElement>>;
};
