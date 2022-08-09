import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  createTheme,
  CssBaseline,
  Fab,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
import { createColumnHelper, MaterialGrid } from "../../src";
import { createFakeList, type FakeRow } from "./fakeFactory";
import theme from "./theme";

const DEFAULT_ROW_COUNT = 200;

const columnHelper = createColumnHelper<FakeRow>();

const columns = [
  columnHelper.accessor("id", { header: "#", size: 100 }),
  columnHelper.accessor("firstName", { header: "First Name", size: 100 }),
  columnHelper.accessor("lastName", { header: "Last Name", size: 100 }),
  columnHelper.accessor("age", { header: "Age", size: 65 }),
  columnHelper.accessor("bio", { header: "Bio", size: 800 }),
  columnHelper.accessor("createdOn", {
    header: "Created On",
    cell: (props) => props.getValue().toLocaleDateString(),
    size: 100,
  }),
  columnHelper.accessor("modifiedOn", {
    header: "Modified On",
    cell: (props) => props.getValue().toLocaleDateString(),
    size: 100,
  }),
];

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const [rowsInput, setRowsInput] = useState(DEFAULT_ROW_COUNT);
  const [rowsOfData, setRowsOfData] = useState(rowsInput);

  const data = useMemo(() => createFakeList(rowsOfData), [rowsOfData]);

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
      <Box display="flex" flexDirection="column" p={4} gap={2}>
        <Box width="100%" height={500}>
          <MaterialGrid columns={columns} data={data} />
        </Box>
        <Box>
          <TextField
            label="Rows"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={`refresh with ${rowsInput} rows`}
                    onClick={() => {
                      setRowsOfData(rowsInput);
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={rowsInput || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10) || 0;
              setRowsInput(value);
            }}
          />
        </Box>
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
        onClick={() => {
          setIsDarkMode((isDark) => !isDark);
        }}
      >
        {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
      </Fab>
    </ThemeProvider>
  );
}
