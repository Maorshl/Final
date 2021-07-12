import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import AddPost from "../AddPost";

test("renders Sign In Page", () => {
  const { getByText } = render(<App />);
  expect(getByText("Sign In")).toBeInTheDocument();
});
test("renders Sign In Page", () => {
  const { getByTestId } = render(<AddPost />);
  const headerEl = getByTestId("AddPost");
  expect(headerEl.textContent).toBe("Add Post");
});
