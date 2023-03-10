import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategorySelected from "../components/Notes/CategorySelected";
import Root from "../Root";
import Entry from "./Entry";
import Home from "./Home";
import Notes from "./Notes";
import NotFound from "./NotFound";
import Write from "./Write";

const router = createBrowserRouter([
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
        path: "entry",
        element: <Entry />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
