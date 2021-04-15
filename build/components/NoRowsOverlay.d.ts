/// <reference types="react" />
import { OverlayProps } from "./Overlay";
export interface NoRowsOverlayProps extends OverlayProps {
    label?: string;
}
export declare const NoRowsOverlay: import("react").ForwardRefExoticComponent<NoRowsOverlayProps & import("react").RefAttributes<HTMLDivElement>>;
export default NoRowsOverlay;
