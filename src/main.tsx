import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AddPost } from "./pages/AddPost/AddPost";
import App from "./App";
import { PATHS } from "./consts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: PATHS.ADD_POST,
        element: <AddPost />,
        index: true,
      },
      {
        path: PATHS.ADD_PODCAST,
        element: null,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
