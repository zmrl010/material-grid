import GridLoadingOverlay from "./GridLoadingOverlay";
import GridNoRowsOverlay from "./GridNoRowsOverlay";

export interface GridOverlaysProps {
  loading?: boolean;
  rows?: unknown[];
}

export default function GridOverlays({ loading, rows }: GridOverlaysProps) {
  if (loading) {
    return <GridLoadingOverlay />;
  }

  if (rows?.length === 0) {
    return <GridNoRowsOverlay />;
  }

  return null;
}
