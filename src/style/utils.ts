import { alpha, darken, lighten, type Theme } from "@mui/material";

/**
 * Get color-mode-aware border color
 */
export function getBorderColor({ palette }: Theme) {
  return palette.mode === "light"
    ? lighten(alpha(palette.divider, 1), 0.88)
    : darken(alpha(palette.divider, 1), 0.68);
}
