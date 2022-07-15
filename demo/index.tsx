import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import { ColumnDef, MaterialGrid } from "../src";
// import "./index.css";

function makeFake(id: string, name: string) {
  return { id, name, createdOn: new Date() };
}

function makeFakeList(count: number) {
  const result = [];

  for (let i = 0; i < count; ++i) {
    result.push(makeFake(String(i), `Zach.v${i}`));
  }

  return result;
}

const fakeData = [
  makeFake("0", "Zach"),
  makeFake("1", "Bob"),
  makeFake("2", "Jim"),
  makeFake("3", "Steve"),
];

const fakeFour = makeFakeList(4);
const fakeTwoHundred = makeFakeList(200);

const cols: ColumnDef<ReturnType<typeof makeFake>>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "createdOn", header: "Created On" },
];

function DemoApp() {
  return (
    <Box width="100%" height={500}>
      <MaterialGrid columns={cols} data={fakeTwoHundred} />
    </Box>
  );
}

const darkTheme = createTheme({});

const demoDiv = document.getElementById("demo");

if (demoDiv) {
  const root = createRoot(demoDiv);
  root.render(
    <ThemeProvider theme={darkTheme}>
      <DemoApp />
    </ThemeProvider>
  );
}