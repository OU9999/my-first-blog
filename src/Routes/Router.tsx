import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategorySelected from "../components/Notes/CategorySelected";
import WriteEdit from "../components/Write/WriteEdit";
import Root from "../Root";
import Entry from "./Entry";
import GuestBook from "./GuestBook";
import Home from "./Home";
import Notes from "./Notes";
import NotFound from "./NotFound";
import Tester from "./Tester";
import Write from "./Write";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "notes",
          element: <Notes />,
          children: [
            {
              path: ":category",
              element: <CategorySelected />,
            },
          ],
        },
        {
          path: "write",
          element: <Write />,
        },
        {
          path: "write/:writeid",
          element: <WriteEdit />,
        },
        {
          path: "entry/:noteid",
          element: <Entry />,
        },
        {
          path: "guestbook",
          element: <GuestBook />,
        },
        {
          path: "tester",
          element: <Tester />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default function Router() {
  return <RouterProvider router={router} />;
}
