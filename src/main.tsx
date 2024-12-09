import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AddPost } from "./pages/AddPost/AddPost";
import App from "./App";
import { PATHS } from "./consts";

const DEFAULT_PAGE = "/add-post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: PATHS.ADD_POST,
        element: <AddPost />,
      },
      {
        path: PATHS.ADD_PODCAST,
        element: null,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={DEFAULT_PAGE} />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
