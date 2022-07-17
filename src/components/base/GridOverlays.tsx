import { CircularProgress, Typography } from "@mui/material";
import { Overlay } from "../styled";

export interface GridOverlaysProps {
  loading?: boolean;
  rows?: unknown[];
}

export default function GridOverlays({ loading, rows }: GridOverlaysProps) {
  if (loading) {
    return (
      <Overlay>
        <CircularProgress />
      </Overlay>
    );
  }

  if (rows?.length === 0) {
    return (
      <Overlay>
        <Typography>No rows to display.</Typography>
      </Overlay>
    );
  }

  return null;
}
