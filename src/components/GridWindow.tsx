import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";

export interface GridWindowProps extends HTMLAttributes<HTMLDivElement> {
  size: { width: number; height: number };
}

type Props = GridWindowProps;

export const GridWindow = forwardRef<HTMLDivElement, Props>(function GridWindow(
  props,
  ref
) {
  const { className, size, ...otherProps } = props;
  return (
    <div className="Grid-windowContainer" style={{ width: size.width }}>
      <div
        ref={ref}
        className={clsx("Grid-window", className)}
        {...otherProps}
        // style={{ top: headerHeight, overflowY: autoHeight ? "hidden" : "auto" }}
      ></div>
    </div>
  );
});

export default GridWindow;
