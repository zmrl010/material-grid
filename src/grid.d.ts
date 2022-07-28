import "@tanstack/react-table";
import { type Ref } from "react";

declare module "@tanstack/react-table" {
  interface TableMeta {
    headRef: Ref<HTMLDivElement>;
    bodyRef: Ref<HTMLDivElement>;
  }
}
