import { ownerWindow, useForkRef, useEventCallback } from "@mui/material";
import {
  CSSProperties,
  forwardRef,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import useIsoLayoutEffect from "../hooks/useIsoLayoutEffect";

interface Size {
  height?: number;
  width?: number;
}

/**
 * *Inspired by*
 * @see https://github.com/mui/mui-x/blob/84d29407d886235701f8999f06d9d1d4e6920b03/packages/grid/x-data-grid/src/components/GridAutoSizer.tsx
 * @see https://github.com/bvaughn/react-virtualized/blob/master/source/AutoSizer/AutoSizer.js
 */
export interface AutoSizerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Function responsible for rendering children.
   * @param size The grid's size.
   * @returns The children to render.
   */
  children: (size: Partial<Size>) => React.ReactNode;
  /**
   * Default height to use for initial render; useful for SSR.
   * @default null
   */
  defaultHeight?: number;
  /**
   * Default width to use for initial render; useful for SSR.
   * @default null
   */
  defaultWidth?: number;
  /**
   * If `true`, disable dynamic :height property.
   * @default false
   */
  disableHeight?: boolean;
  /**
   * If `true`, disable dynamic :width property.
   * @default false
   */
  disableWidth?: boolean;
  /**
   * Nonce of the inlined stylesheet for Content Security Policy.
   */
  nonce?: string;
  /**
   * Callback to be invoked on-resize.
   * @param size The grid's size.
   */
  onResize?: (size: Size) => void;
}

/**
 * Extract padding values from an element's computed style
 */
function getPadding(element: HTMLElement) {
  const win = ownerWindow(element);
  const computedStyle = win.getComputedStyle(element);

  return {
    left: parseInt(computedStyle.paddingLeft, 10) || 0,
    right: parseInt(computedStyle.paddingRight, 10) || 0,
    top: parseInt(computedStyle.paddingTop, 10) || 0,
    bottom: parseInt(computedStyle.paddingBottom, 10) || 0,
  };
}

const GridAutoSizer = forwardRef<HTMLDivElement, AutoSizerProps>(
  function GridAutoSizer(
    {
      children,
      defaultHeight = null,
      defaultWidth = null,
      disableHeight = false,
      disableWidth = false,
      onResize,
      style,
      ...other
    },
    ref
  ) {
    /************************************************
     * TODO extract component logic to custom hook
     ***********************************************/

    const [size, setSize] = useState({
      height: defaultHeight,
      width: defaultWidth,
    });

    const elementRef = useRef<HTMLDivElement | null>(null);
    const parentRef = useRef<HTMLElement | null>(null);

    const handleResize = useEventCallback(() => {
      /**
       * Guard against AutoSizer component being removed
       * from the DOM immediately after being added.
       * This can result in invalid style values which
       * can result in NaN values if we don't handle them.
       */
      if (!parentRef.current) {
        return;
      }

      const padding = getPadding(parentRef.current);

      const { offsetHeight = 0, offsetWidth = 0 } = parentRef.current;

      const newHeight = offsetHeight - padding.top - padding.bottom;
      const newWidth = offsetWidth - padding.left - padding.right;

      if (
        (!disableHeight && size.height !== newHeight) ||
        (!disableWidth && size.width !== newWidth)
      ) {
        const size = { height: newHeight, width: newWidth };

        setSize(size);
        onResize?.(size);
      }
    });

    useIsoLayoutEffect(() => {
      parentRef.current = elementRef.current?.parentElement ?? null;

      if (!parentRef.current) {
        return;
      }

      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(parentRef.current, { box: "border-box" });
      handleResize();

      return () => resizeObserver.disconnect();
    }, [handleResize]);

    const outerStyle: CSSProperties = { overflow: "visible" };
    const childParams: Partial<Size> = {};

    if (!disableHeight) {
      outerStyle.height = 0;
      childParams.height = size.height ?? undefined;
    }

    if (!disableWidth) {
      outerStyle.width = 0;
      childParams.width = size.width ?? undefined;
    }

    const handleRef = useForkRef(elementRef, ref);

    return (
      <div
        ref={handleRef}
        style={{
          ...outerStyle,
          ...style,
        }}
        {...other}
      >
        {size.height === null && size.width === null
          ? null
          : children(childParams)}
      </div>
    );
  }
);

export default GridAutoSizer;
