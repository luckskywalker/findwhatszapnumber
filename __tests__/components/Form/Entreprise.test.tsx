import {render, screen, fireEvent} from "@testing-library/react";
import {FormEnterprise} from "@/components/Form/Enterprise";

describe("Page", () => {

  it("should be ok", async () => {
    render(<FormEnterprise onSubmit={() => console.log("test")} />);
    await fireEvent.click(screen.getByText(/submit/i));
  });
});