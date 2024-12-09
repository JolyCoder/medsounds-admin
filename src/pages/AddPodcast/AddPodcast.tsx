import { useState, type FC } from "react";

import styles from "./AddPodcast.module.css";

export const AddPodcast: FC = () => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [audio, setAudio] = useState<File>();
  const [description, setDescription] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (!file) {
      return;
    }

    setImage(file);
  };

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    setAudio(file);
  };

  const handleCreatePodcast = () => {
    const formData = new FormData();

    if (audio) {
      formData.set("podcast", audio);
    }

    if (image) {
      formData.set("image", image);
    }

    formData.set("title", name);
    formData.set("tags", tags);
    formData.set("description", description);

    fetch("/api/podcasts", {
      method: "POST",
      headers: {},
      body: formData,
    })
      .then((res) => {
        res.json().then(({ id }) => {
          alert(`Подкаст успешно создан. ID: ${id}`);
        });
      })
      .catch((err) => {
        alert("Произошла ошибка при создании подкаста, смотрите в консоль");

        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputElement}>
        <label>Название подкаста:</label>

        <input value={name} onChange={(ev) => setName(ev.target.value)} />
      </div>

      <div className={styles.inputElement}>
        <label>Список тегов через запятую:</label>

        <input value={tags} onChange={(ev) => setTags(ev.target.value)} />
      </div>

      <div className={styles.inputElement}>
        <label>Описание подкаста:</label>

        <input
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </div>

      <div className={styles.inputElement}>
        <label>Картинка подкаста:</label>

        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
      </div>

      <div className={styles.inputElement}>
        <label>Аудиозапись подкаста:</label>

        <input type="file" accept="audio/*" onChange={handleAudioChange} />
      </div>

      <button onClick={handleCreatePodcast}>Создать подкаст</button>
    </div>
  );
};
