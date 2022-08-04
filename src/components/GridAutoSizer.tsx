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
 * @see https://github.com/mui/mui-x/blob/84d29407d886235701f8999f06d9d1d4e6920b03/packages/grid/x-data-grid/src/components/GridAutoSizer.tsx
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

    const [state, setState] = useState({
      height: defaultHeight,
      width: defaultWidth,
    });

    const rootRef = useRef<HTMLDivElement | null>(null);
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

      const win = ownerWindow(parentRef.current);
      const computedStyle = win.getComputedStyle(parentRef.current);

      const paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
      const paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
      const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
      const paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;

      const { offsetHeight = 0, offsetWidth = 0 } = parentRef.current;

      const newHeight = offsetHeight - paddingTop - paddingBottom;
      const newWidth = offsetWidth - paddingLeft - paddingRight;

      if (
        (!disableHeight && state.height !== newHeight) ||
        (!disableWidth && state.width !== newWidth)
      ) {
        setState({ height: newHeight, width: newWidth });
        onResize?.({ height: newHeight, width: newWidth });
      }
    });

    useIsoLayoutEffect(() => {
      parentRef.current = rootRef.current?.parentElement ?? null;

      if (!parentRef.current) {
        return;
      }

      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(parentRef.current);
      handleResize();

      return () => {
        if (parentRef.current) {
          resizeObserver.unobserve(parentRef.current);
        }
      };
    }, [handleResize]);

    const outerStyle: CSSProperties = { overflow: "visible" };
    const childParams: Partial<Size> = {};

    if (!disableHeight) {
      outerStyle.height = 0;
      childParams.height = state.height ?? undefined;
    }

    if (!disableWidth) {
      outerStyle.width = 0;
      childParams.width = state.width ?? undefined;
    }

    const handleRef = useForkRef(rootRef, ref);

    return (
      <div
        ref={handleRef}
        style={{
          ...outerStyle,
          ...style,
        }}
        {...other}
      >
        {state.height === null && state.width === null
          ? null
          : children(childParams)}
      </div>
    );
  }
);

export default GridAutoSizer;
