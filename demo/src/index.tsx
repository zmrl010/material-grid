import { createRoot } from "react-dom/client";
import App from "./App";

(function main() {
  let rootEl = document.getElementById("root");

  if (!rootEl) {
    rootEl = document.createElement("div");
    document.body.appendChild(rootEl);
  }

  const root = createRoot(rootEl);
  root.render(<App />);
})();
