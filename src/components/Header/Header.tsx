import type { FC } from "react";

import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router";

import cn from "classnames";
import { PATHS } from "../../consts";

export const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span
        className={cn(
          styles.linkButton,
          location.pathname === PATHS.ADD_POST && styles.activeLinkButton
        )}
        onClick={() => navigate(PATHS.ADD_POST)}
      >
        Создать пост
      </span>

      <span
        className={cn(
          styles.linkButton,
          location.pathname === PATHS.ADD_PODCAST && styles.activeLinkButton
        )}
        onClick={() => navigate(PATHS.ADD_PODCAST)}
      >
        Добавить подкаст
      </span>

      <span
        className={cn(
          styles.linkButton,
          location.pathname === PATHS.POSTS_LIST && styles.activeLinkButton
        )}
        onClick={() => navigate(PATHS.POSTS_LIST)}
      >
        Список постов
      </span>

      <span
        className={cn(
          styles.linkButton,
          location.pathname === PATHS.PODCAST_LIST && styles.activeLinkButton
        )}
        onClick={() => navigate(PATHS.PODCAST_LIST)}
      >
        Список подкастов
      </span>
    </div>
  );
};
