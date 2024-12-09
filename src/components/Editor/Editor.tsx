import MDEditor from "@uiw/react-md-editor";
import type { FC } from "react";

import styles from "./Editor.module.css";

export type EditorProps = {
  value: string;
  onValueChange: (markdown: string) => void;
};

export const Editor: FC<EditorProps> = ({ value, onValueChange }) => {
  const handleChange = (value?: string) => {
    if (!value) {
      onValueChange("");

      return;
    }

    onValueChange(value);
  };

  return (
    <MDEditor
      data-color-mode="light"
      height={800}
      value={value}
      onChange={handleChange}
      className={styles.editor}
    />
  );
};
