import type { FC } from "react";

import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <div className={styles.container}>
      <span>Веб-студия "Грузино-кударское сообщество"</span>
    </div>
  );
};
