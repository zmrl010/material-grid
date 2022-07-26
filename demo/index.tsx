import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import { ColumnDef, MaterialGrid } from "../src";
// import "./index.css";

function makeFake(id: string, name: string) {
  return { id, name, createdOn: new Date() };
}

function makeFakeList(count: number) {
  return Array(count)
    .fill(0)
    .map((_, i) => makeFake(String(i), `Zach.v${i}`));
}

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

function main() {
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
}

main();
