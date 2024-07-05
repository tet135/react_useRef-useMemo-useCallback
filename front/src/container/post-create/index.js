import "./index.css";

import { useState } from "react";

import Grid from "../../component/grid";
import FieldForm from "../../component/field-form";

import { Alert, Loader, LOAD_STATUS } from "../../component/load";

// props id поста (до якого дається відповідь) є необов'язковим і буде передаватися разом з даними з контейнера post-crate
export default function Container({
  onCreate,
  placeholder,
  button,
  id = null,
}) {
  //для статусу
  const [status, setStatus] = useState(null);
  //для повідомлення про помилку
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
    return sendData({ value });
  };
  //dataToSend - це value(дані, які надсилаємо)
  const sendData = async (dataToSend) => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch(`http://localhost:4000/post-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        //or setStatus(success)
        setStatus(null);
        //props onCreate містить функцію getData, яка виводить список постів.
        //отже користувач побачить оновлену сторінку сайту зі своїм постом,
        // і так зрозуміє, що запит виконався успішно
        if (onCreate) onCreate();
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      //важливо спочатку месседж, а потім статус
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  // dataToSend = value;
  const convertData = ({ value }) =>
    JSON.stringify({
      text: value,
      //тут "user", бо тут немає аутентифікації(ex., класу User)
      username: "user",
      postId: id,
    });

  return (
    <Grid>
      {/* FieldForm відповідає за бізнес-логіку */}
      <FieldForm
        placeholder={placeholder}
        button={button}
        onSubmit={handleSubmit}
      />
    </Grid>
  );
}
