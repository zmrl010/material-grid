import type { Row } from "@tanstack/react-table";
import { describe, it, expect } from "vitest";
import GridOverlays from "../GridOverlays";
import { render, screen } from "../../../test/util";

describe("<GridOverlays />", () => {
  type Data = { id: string; name: string };
  const fakeData = {
    id: "0",
    getVisibleCells: () => [],
  } as unknown as Row<Data>;

  it("should display a message when there are no rows", () => {
    render(<GridOverlays rows={[]} />);

    expect(screen.getByText("No rows to display.")).toBeTruthy();
  });

  it("should display a loading indicator when loading state is true", () => {
    render(<GridOverlays rows={[fakeData]} loading />);

    expect(screen.getByRole("progressbar")).toBeTruthy();
  });
});
