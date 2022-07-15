import { render, screen } from "@testing-library/react";
import type { Row } from "@tanstack/react-table";
import GridBody, { GridBodyProps } from "../GridBody";

describe("<GridContent />", () => {
  type Data = { id: string; name: string };
  const fakeData = {
    id: "0",
    getVisibleCells: () => [],
  } as unknown as Row<Data>;
  const props: GridBodyProps<typeof fakeData> = {
    height: 10,
    bodyRef: () => {
      /** */
    },
  };

  it("should display a message when there are no rows", () => {
    render(<GridBody {...props} />);

    expect(screen.getByText("No data to display.")).toBeTruthy();
  });

  it("should display a loading indicator when loading state is true", () => {
    render(<GridBody {...props} rows={[fakeData]} loading />);

    expect(screen.getByRole("progressbar")).toBeTruthy();
  });

  it("should prepare rows normally", () => {
    const rows = [fakeData];

    rows.map = jest.fn();

    render(<GridBody {...props} rows={rows} />);

    expect(rows.map).toHaveBeenCalled();
  });
});
