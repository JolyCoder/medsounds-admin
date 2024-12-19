import { useCallback, useEffect, useState, type FC } from "react";

import styles from "./PostsList.module.css";
import { getBrowserIdent } from "../../utils/createBrowserIdent";

type Post = {
  post_id: number;
  created_at: number;
  title: string;
  content: string;
  tags: string[];
  image: string; // URL
  likes: number;
  liked: boolean;
  type: string;
};

export const PostsList: FC = () => {
  const [postsList, setPostsList] = useState<Post[]>([]);

  const loadPosts = useCallback(() => {
    fetch("/api/posts", {
      headers: {
        "browser-ident": getBrowserIdent(),
      },
    })
      .then((res) => {
        res.json().then((parsedRes) => setPostsList(parsedRes.posts));
      })
      .catch((err) => {
        alert("Произошла ошибка при загрузке списка постов, смотри в консоль");

        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handlePostDelete = (postId: number) => {
    fetch(`/api/posts/${postId}`, {
      headers: {
        "browser-ident": getBrowserIdent(),
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          loadPosts();
          alert("Пост успешно удален!");

          return;
        }

        alert("Произошла ошибка при удалении поста, смотри в консоль");
        console.error(res);
      })
      .catch((err) => {
        alert("Произошла ошибка при удалении поста, смотри в консоль");
        console.error(err);
      });
  };

  if (!postsList) {
    return null;
  }

  return (
    <div className={styles.container}>
      {postsList.map((post) => (
        <div className={styles.element}>
          <span>{post.title}</span>

          <button onClick={() => handlePostDelete(post.post_id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};
