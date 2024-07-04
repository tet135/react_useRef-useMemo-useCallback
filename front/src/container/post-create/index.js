import "./index.css";

import Grid from "../../component/grid";
import FieldForm from "../../component/field-form";

// props id поста (до якого дається відповідь) є необов'язковим і буде передаватися разом з даними з контейнера post-crate
export default function Container(onCreate, placeholder, button, id) {
  console.log(placeholder, button);
  const handleSubmit = (value) => {
    alert(value);
  };

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
