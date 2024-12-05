import { Link } from "react-router-dom";

import defaultImage from "../../assets/cat_casual.jpg";

import style from "./Categories.module.css";

export default function Categories({ title, products = [], amount }) {
  const list = products.filter((_, i) => i < amount);
  return (
    <section className={style.categories}>
      <h2>{title}</h2>
      <div className={style.grid}>
        {list.map(({ id, name, image }) => {
          const isValidImage = /\.(jpeg|jpg|png)$/i.test(image);
          return (
            <Link to={`/categories/${id}`} key={id} className={style.category}>
              <img src={isValidImage ? image : defaultImage} alt={name} />
              <h3 className={style.titleAbsolute}>{name}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
