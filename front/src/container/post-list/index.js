import Grid from "../../component/grid";
import Box from "../../component/box";
import Title from "../../component/title";
import PostCreate from "../post-create";

export default function Container() {
  const getData = () => {
    // тут функціонал для отримання списка постів
  };

  return (
    <Grid>
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
    </Grid>
  );
}
