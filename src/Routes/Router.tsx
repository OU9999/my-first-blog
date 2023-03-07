import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Root";
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
      },
      {
        path: "write",
        element: <Write />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
