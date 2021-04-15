import { HTMLAttributes } from "react";
declare type Anchor = "left" | "right" | "top" | "bottom";
export interface DragHandleProps extends HTMLAttributes<HTMLDivElement> {
    IconComponent?: () => JSX.Element;
    anchor?: Anchor;
}
export declare const DragHandle: import("react").ForwardRefExoticComponent<DragHandleProps & import("react").RefAttributes<HTMLDivElement>>;
export default DragHandle;
