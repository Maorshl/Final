import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import AddPost from "../AddPost";
import PostCard from "../PostCard";
import CardTags from "../CardTags";

test("renders Sign In Page", () => {
  const { getByText } = render(<App />);
  expect(getByText("Sign In")).toBeInTheDocument();
});

test("renders Add post page", () => {
  const { getByTestId } = render(<AddPost />);
  const headerEl = getByTestId("AddPost");
  expect(headerEl.textContent).toBe("Add Post");
});

test("render post card", () => {
  const mockPost = {
    tags: ["JS", "DEV"],
    likes: [],
    raters: [],
    _id: "60eaa4bfbb07e60e74dacf6a",
    title: "Algo",
    url: "https://github.com/trekhleb/javascript-algorithms",
    description: "JS algo repo",
    private: false,
    createdAt: "2021-07-11T07:58:55.459Z",
    author: "gil6464",
    rating: 0,
    rateAVG: 0,
    head: "GitHub - trekhleb/javascript-algorithms: 📝 Algorithms and data structures implemented in JavaScript with explanations and links to further readings",
    __v: 0,
  };
  const { getByTestId } = render(<PostCard post={mockPost} />);
  const headerEl = getByTestId("postHead");
  const descriptionEl = getByTestId("postDescription");
  expect(headerEl.textContent).toBe(mockPost.head);
  expect(descriptionEl.textContent).toBe(mockPost.description);
});

test("render post tags", () => {
  const mockTags = ["JS", "DEV"];
  const { getByTestId } = render(<CardTags tags={mockTags} />);
  const tagsEl0 = getByTestId("postTag0");
  const tagsEl1 = getByTestId("postTag1");
  expect(tagsEl0.textContent).toBe("JS");
  expect(tagsEl1.textContent).toBe("DEV");
});
