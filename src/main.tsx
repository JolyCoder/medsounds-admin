import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AddPost } from "./pages/AddPost/AddPost";
import App from "./App";
import { BASENAME, PATHS } from "./consts";
import { AddPodcast } from "./pages/AddPodcast/AddPodcast";
import { PostsList } from "./pages/PostsList/PostsList";
import { PodcastsList } from "./pages/PodcastsList/PodcastsList";

const router = createBrowserRouter(
  [
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
        {
          path: PATHS.POSTS_LIST,
          element: <PostsList />,
        },
        {
          path: PATHS.PODCAST_LIST,
          element: <PodcastsList />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ],
  { basename: BASENAME }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
