import { render } from "@testing-library/react";
import MaterialGrid from "./MaterialGrid";

describe("<MaterialGrid />", () => {
  it("should render with minimal props", () => {
    render(<MaterialGrid data={[]} columns={[]} />);
  });
});
