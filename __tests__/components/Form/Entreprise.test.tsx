import "@testing-library/jest-dom";
import {http, HttpResponse} from "msw";
import {setupServer} from "msw/node";
import FormEnterprise from "@/components/Form/Enterprise";
import {render, fireEvent} from "@testing-library/react";
import {act} from "react";

const server = setupServer(
  http.get("/greeting", () => {
    return HttpResponse.json({greeting: "hello there"});
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Component Form Enterprise", () => {
  it("should show errors fields empty", async () => {
    const {debug, container, findByRole} = render(
      <FormEnterprise />
    );
    await act(async () => {
      const button = await findByRole("button", {name: "submit"});
      //const buttonA = container.querySelector("button[type=\"submit\"]");
      fireEvent.click(button as Element);
    });
    expect(container).toMatchSnapshot();
  });
 
  it("should show errors on address only", async () => {
    const {container, findByRole, getByLabelText} = render(
      <FormEnterprise />
    );
    await act(async () => {
      const inputLabel = getByLabelText("label");
      fireEvent.change(inputLabel, {target: {value: "labelValue"}});

      const inputDescription = getByLabelText("description");
      fireEvent.change(inputDescription, {target: {value: "DescriptionValue"}});

      const inputCategory = getByLabelText("category");
      fireEvent.change(inputCategory, {target: {value: "Coiffeur"}});

      const inputPhoneNumber = getByLabelText("phoneNumber");
      fireEvent.change(inputPhoneNumber, {target: {value: "PhoneNumberValue"}});
    
      const button = await findByRole("button", {name: "submit"});
      fireEvent.click(button as Element);
    });
  
    expect(container).toMatchSnapshot();
  });
  
});


