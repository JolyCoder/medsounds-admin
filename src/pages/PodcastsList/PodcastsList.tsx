import { useCallback, useEffect, useState, type FC } from "react";

import styles from "./PodcastsList.module.css";
import { getBrowserIdent } from "../../utils/createBrowserIdent";

type Podcast = {
  id: number;
  title: string;
  description: string;
  author: string;
  duration: number;
  likes: number;
  auditions: number;
  tags: string[];
  liked: boolean;
  image: string; // URL
  podcast: string;
  created_at: number;
};

export const PodcastsList: FC = () => {
  const [podcastsList, setPodcastsList] = useState<Podcast[]>([]);

  const loadPodcasts = useCallback(() => {
    fetch("/api/podcasts", {
      headers: {
        "browser-ident": getBrowserIdent(),
      },
    })
      .then((res) => {
        res.json().then((parsedRes) => setPodcastsList(parsedRes.podcasts));
      })
      .catch((err) => {
        alert(
          "Произошла ошибка при загрузке списка подкастов, смотри в консоль"
        );

        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadPodcasts();
  }, [loadPodcasts]);

  const handlePodcastDelete = (podcastId: number) => {
    fetch(`/api/podcasts/${podcastId}`, {
      headers: {
        "browser-ident": getBrowserIdent(),
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          loadPodcasts();
          alert("Пост успешно удален!");

          return;
        }

        alert("Произошла ошибка при удалении подкаста, смотри в консоль");
        console.error(res);
      })
      .catch((err) => {
        alert("Произошла ошибка при удалении подкаста, смотри в консоль");
        console.error(err);
      });
  };

  if (!podcastsList) {
    return null;
  }

  return (
    <div className={styles.container}>
      {podcastsList.map((podcast) => (
        <div className={styles.element}>
          <span>{podcast.title}</span>

          <button onClick={() => handlePodcastDelete(podcast.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};
