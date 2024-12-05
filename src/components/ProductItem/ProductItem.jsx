import { Link } from "react-router-dom";

import starIcon from "../../assets/icons/star.svg";

import style from "./ProductItem.module.css";

export default function ProductItem({ title, products = [], amount }) {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={`container ${style.list}`}>
      <h2>{title}</h2>
      <div className={style.content}>
        {list.map(({ id, images, title, price, oldPrice, rate }) => (
          <div key={id} className={style.body}>
            <Link to={`/products/${id}`} className={style.image}>
              <img src={images[0]} alt="" />
            </Link>
            <div className={style.wrapper}>
              <Link to={`/products/${id}`} className="products">
                <h3 className={style.title}>{title}</h3>
              </Link>
              {rate && (
                <div className={style.rate}>
                  <div className={style.stars}>
                    {Array.from({ length: rate }).map((_, index) => (
                      <img src={starIcon} key={index} />
                    ))}
                  </div>
                  <div className={style.numberRate}>
                    {rate}/<span>5</span>
                  </div>
                </div>
              )}
              <div className={style.info}>
                <div className={style.prices}>
                  <div className={style.price}>{price}$</div>
                  {oldPrice && (
                    <>
                      <span className={style.oldPrice}>${oldPrice}</span>
                      <div className={style.percent}>
                        -{Math.round((1 - price / oldPrice) * 100)}%
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
