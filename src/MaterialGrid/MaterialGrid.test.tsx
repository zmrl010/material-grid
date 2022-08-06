import { describe, it, vi } from "vitest";
import MaterialGrid from "./MaterialGrid";
import { render } from "../test/testUtil";

const ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserver);

describe("<MaterialGrid />", () => {
  it("should render with minimal props", () => {
    render(<MaterialGrid data={[]} columns={[]} />);
  });
});
