import {
  CssBaseline,
  Box,
  Fab,
  ThemeProvider,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { ColumnDef, MaterialGrid } from "../../src";
import { makeFakeList, type FakeRow } from "./fakeFactory";
import theme from "./theme";
import { useMemo, useState } from "react";

const fakeTwoHundred = makeFakeList(200);

const cols: ColumnDef<FakeRow>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "createdOn", header: "Created On" },
  { accessorKey: "modifiedOn", header: "Modified On" },
  { accessorKey: "description", header: "Description", size: 200 },
];

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDarkMode);

  const themeWithMode = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={themeWithMode}>
      <CssBaseline />
      <Box width="100%" height={500} p={4}>
        <MaterialGrid columns={cols} data={fakeTwoHundred} />
      </Box>
      <Fab
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          bgcolor: "background.default",
          color: "text.primary",
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        onClick={() => setIsDarkMode((isDark) => !isDark)}
      >
        {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
      </Fab>
    </ThemeProvider>
  );
}
