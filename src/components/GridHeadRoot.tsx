import { StyledComponent } from "@emotion/styled";
import { styled, TableHead, type TableHeadProps } from "@mui/material";
import { forwardRef, type ComponentPropsWithRef } from "react";
import { getBorderColor } from "./styled";
import { COMPONENT_NAME } from "../constants";

const GridHeadRootBase = forwardRef<HTMLDivElement, TableHeadProps>(
  function GridHead(props, ref) {
    return <TableHead component="div" {...props} ref={ref} />;
  }
);

export const GridHeadRoot: StyledComponent<ComponentPropsWithRef<"div">> =
  styled(GridHeadRootBase, {
    name: COMPONENT_NAME,
    slot: "Head",
  })(({ theme }) => ({
    display: "flex",
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottom: `1px solid ${getBorderColor(theme)}`,
  }));
