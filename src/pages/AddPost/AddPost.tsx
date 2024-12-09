import { useState, type FC } from "react";

import styles from "./AddPost.module.css";
import { Editor } from "../../components/Editor/Editor";

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

const getTagsArrayFromString = (tagsString: string) => {
  return tagsString.split(",").map((tag) => tag.trim());
};

export const AddPost: FC = () => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [image, setImage] = useState<string>();
  const [content, setContent] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (!file) {
      return;
    }

    toBase64(file).then((value) => setImage(value));
  };

  const handleCreatePost = () => {
    const createPostRequest = {
      title: name,
      tags: getTagsArrayFromString(tags),
      content,
      image,
    };

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createPostRequest),
    })
      .then((res) => {
        res.json().then(({ post_id }) => {
          alert(`Пост успешно создан. ID: ${post_id}`);
        });
      })
      .catch((err) => {
        alert("Произошла ошибка при создании поста, смотрите в консоль");

        console.log(err);
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
