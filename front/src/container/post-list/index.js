import { useState, Fragment } from "react";

import Grid from "../../component/grid";
import Box from "../../component/box";
import Title from "../../component/title";

import PostItem from "../post-item";
import PostCreate from "../post-create";

import { Alert, LOAD_STATUS, Skeleton } from "../../component/load";

import { getDate } from "../../util/getDate";

export default function Container() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  //data- щоб тримати дані з сервера
  const [data, setData] = useState(null);

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);

    // тут функціонал для отримання списка постів
    try {
      const res = await fetch(
        "http://localhost:4000/post-list",
        //method: "GET" можна не писати, бо за замовчуванням всякий метод GET
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setData(convertData(data));
        setStatus(LOAD_STATUS.SUCCESS);
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = (raw) => ({
    list: raw.list.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),

    isEmpty: raw.list.length === 0,
  });

  if (status === null) {
    getData();
  }

  return (
    <Grid>
      {/* //це створення нового поста */}
      <Box>
        <Grid>
          <Title>Home</Title>
          <PostCreate
            //в пропс onCreate кладемо функцію getData, щоб при створенні нового поста
            // одразу оновлювалися дані і оновлювався перелік постів
            onCreate={getData}
            placeholder="What is happening?!"
            button="Post"
          />
        </Grid>
      </Box>

      {/* //тут будуть виводитись пости */}
      {status === LOAD_STATUS.PROGRESS && (
        <Fragment>
          <Box>
            <Skeleton />
          </Box>
          <Box>
            <Skeleton />
          </Box>
        </Fragment>
      )}

      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}

      {status === LOAD_STATUS.SUCCESS && (
        <Fragment>
          {data.isEmpty ? (
            <Alert message="Список постів порожній" />
          ) : (
            data.list.map((item) => (
              <Fragment key={item.id}>
                {/* //item = id, username, text, date */}
                <PostItem {...item} />
              </Fragment>
            ))
          )}
        </Fragment>
      )}
    </Grid>
  );
}
