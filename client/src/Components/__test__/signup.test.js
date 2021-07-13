import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUp from "../SignUp";
import Notifications from "../Notifications";

test("renders Sign up Page", () => {
  const { getByTestId } = render(<SignUp />);
  expect(getByTestId("SignUpHeader")).toBeInTheDocument();
});
test("Checks Notification read state", () => {
  const mockNotification = {
    createdAt: "2021-07-11T12:05:49.995+00:00",
    read: false,
    post: {
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
    },
  };
  const { getByTestId } = render(
    <Notifications notification={mockNotification} />
  );
  expect(getByTestId("mainNotificationDiv").className).toBe(
    "notificationUnread"
  );
});
