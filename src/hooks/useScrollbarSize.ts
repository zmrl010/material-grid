import { ownerDocument } from "@mui/material";
import { useState } from "react";
import getScrollbarSize from "../utils/getScrollbarSize";
import useIsoLayoutEffect from "./useIsoLayoutEffect";

export default function useScrollbarSize(node: Node | null | undefined) {
  const [scrollbarSize, setScrollbarSize] = useState(0);

  useIsoLayoutEffect(() => {
    const nextScrollbarSize = getScrollbarSize(ownerDocument(node));
    if (scrollbarSize !== nextScrollbarSize) {
      setScrollbarSize(nextScrollbarSize);
    }
  });

  return scrollbarSize;
}
