import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AddPost } from "./pages/AddPost/AddPost";
import App from "./App";
import { PATHS } from "./consts";
import { AddPodcast } from "./pages/AddPodcast/AddPodcast";

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
        element: <AddPodcast />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
