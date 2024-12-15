import { useState, type FC } from "react";

import styles from "./AddPost.module.css";
import { Editor } from "../../components/Editor/Editor";
import { getTagsArrayFromString } from "../../utils/getTagsArrayFromString";

export const AddPost: FC = () => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [content, setContent] = useState<string>("");
  const [suggested, setSuggested] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (!file) {
      return;
    }

    setImage(file);
  };

  const handleCreatePost = () => {
    const formData = new FormData();

    if (image) {
      formData.set("image", image);
    }

    getTagsArrayFromString(tags).forEach((tag) => formData.append("tags", tag));

    formData.set("title", name);
    formData.set("content", content);
    formData.set("type_", suggested ? "suggested" : "academy");

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then(({ post_id }) => {
          alert(`Пост успешно создан. ID: ${post_id}`);
        });
      } else {
        alert("Произошла ошибка при создании поста, смотрите в консоль");

        console.log(res);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputElement}>
        <label>Название поста:</label>

        <input value={name} onChange={(ev) => setName(ev.target.value)} />
      </div>

      <div className={styles.inputElement}>
        <label>Список тегов через запятую:</label>

        <input value={tags} onChange={(ev) => setTags(ev.target.value)} />
      </div>

      <div className={styles.inputElement}>
        <label>Список тегов через запятую:</label>

        <input
          type="checkbox"
          value={suggested ? "true" : ""}
          onChange={(ev) => setSuggested(!!ev.target.value)}
        />
      </div>

      <div className={styles.inputElement}>
        <label>Картинка поста:</label>

        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
      </div>

      <div className={styles.editorContainer}>
        <label>Контент статьи:</label>

        <Editor onValueChange={setContent} value={content} />
      </div>

      <button onClick={handleCreatePost}>Создать пост</button>
    </div>
  );
};
