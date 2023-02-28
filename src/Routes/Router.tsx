import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Root";
import Home from "./Home";
import Notes from "./Notes";
import NotFound from "./NotFound";

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
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
