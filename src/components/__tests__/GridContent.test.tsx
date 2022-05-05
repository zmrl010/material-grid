import { render, screen } from "@testing-library/react";
import type { Row } from "react-table";
import GridContent from "../GridContent";

describe("<GridContent />", () => {
  let mockPrepareRow: () => void;

  beforeEach(() => {
    mockPrepareRow = jest.fn(() => {
      /** empty */
    });
  });

  it("should display a message when there are no rows", () => {
    render(<GridContent rows={[]} prepareRow={mockPrepareRow} />);

    expect(screen.getByText("No data to display.")).toBeTruthy();
    expect(mockPrepareRow).not.toHaveBeenCalled();
  });

  it("should display a loading indicator when loading state is true", () => {
    render(<GridContent rows={[]} prepareRow={mockPrepareRow} loading />);

    expect(screen.getByRole("progressbar")).toBeTruthy();
    expect(mockPrepareRow).not.toHaveBeenCalled();
  });

  it("should prepare rows normally", () => {
    render(
      <GridContent
        rows={[
          {
            getRowProps: () => ({ key: 0 }),
            id: "0",
            cells: [],
          } as unknown as Row,
        ]}
        prepareRow={mockPrepareRow}
      />
    );

    expect(mockPrepareRow).toHaveBeenCalled();
  });
});
