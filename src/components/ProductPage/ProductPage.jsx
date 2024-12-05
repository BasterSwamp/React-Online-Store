import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/user/userSlice";

import starIcon from "../../assets/icons/star.svg";

import style from "./ProductPage.module.css";

export default function ProductPage(item) {
  const {
    id,
    title,
    images,
    sizes = "",
    description,
    price,
    oldPrice = "",
    rate,
  } = item;

  const dispatch = useDispatch();

  const [currentImg, setCurrentImg] = useState(images[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0]);
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < 9999) setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const addToCart = () => {
    dispatch(
      addItemToCart({
        ...item,
        size: currentSize,
        quantity: count,
      })
    );
  };

  useEffect(() => {
    setCurrentImg(images[0]);
    setCurrentSize(sizes[0]);
    setCount(1);
  }, [id]);

  return (
    <section className={`container ${style.container}`}>
      <div className={style.images}>
        <div className={style.preview}>
          {images.slice(0, 3).map((image, imageIndex) => (
            <div
              className={`${style.image} ${
                currentImg === image ? style.active : ""
              }`}
              key={imageIndex}
              onClick={() => {
                setCurrentImg(image);
              }}
            >
              <img src={image} alt="" />
            </div>
          ))}
        </div>
        <div className={style.currentImage}>
          <img src={currentImg} alt="" />
        </div>
      </div>
      <div className={style.info}>
        <h1 className={style.title}>{title}</h1>
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
        <div className={style.prices}>
          <span className={style.price}>${price}</span>
          {oldPrice && (
            <>
              <span className={style.oldPrice}>${oldPrice}</span>
              <div className={style.percent}>
                -{Math.round((1 - price / oldPrice) * 100)}%
              </div>
            </>
          )}
        </div>
        <p className={style.description}>{description}</p>
        {sizes && (
          <>
            <hr />
            <div className={style.sizesBody}>
              <h3>Choose Size</h3>
              <div className={style.sizes}>
                {sizes.map((size, sizeIndex) => (
                  <span
                    className={`${style.size} ${
                      currentSize === size ? style.active : ""
                    }`}
                    key={sizeIndex}
                    onClick={() => {
                      setCurrentSize(size);
                    }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        <hr />
        <div className={style.buttons}>
          <div className={style.counter}>
            <button
              onClick={decrement}
              disabled={count === 1}
              className={count === 1 ? style.disabledButton : ""}
            >
              <svg
                width="20"
                height="4"
                viewBox="0 0 20 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.375 2C19.375 2.29837 19.2565 2.58452 19.0455 2.79549C18.8345 3.00647 18.5484 3.125 18.25 3.125H1.75C1.45163 3.125 1.16548 3.00647 0.954505 2.79549C0.743526 2.58452 0.625 2.29837 0.625 2C0.625 1.70163 0.743526 1.41548 0.954505 1.2045C1.16548 0.993526 1.45163 0.875 1.75 0.875H18.25C18.5484 0.875 18.8345 0.993526 19.0455 1.2045C19.2565 1.41548 19.375 1.70163 19.375 2Z" />
              </svg>
            </button>
            <span className={style.numberCounter}>{count}</span>
            <button
              onClick={increment}
              disabled={count === 9999}
              className={count === 9999 ? style.disabledButton : ""}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.375 10C19.375 10.2984 19.2565 10.5845 19.0455 10.7955C18.8345 11.0065 18.5484 11.125 18.25 11.125H11.125V18.25C11.125 18.5484 11.0065 18.8345 10.7955 19.0455C10.5845 19.2565 10.2984 19.375 10 19.375C9.70163 19.375 9.41548 19.2565 9.2045 19.0455C8.99353 18.8345 8.875 18.5484 8.875 18.25V11.125H1.75C1.45163 11.125 1.16548 11.0065 0.954505 10.7955C0.743526 10.5845 0.625 10.2984 0.625 10C0.625 9.70163 0.743526 9.41548 0.954505 9.2045C1.16548 8.99353 1.45163 8.875 1.75 8.875H8.875V1.75C8.875 1.45163 8.99353 1.16548 9.2045 0.954505C9.41548 0.743526 9.70163 0.625 10 0.625C10.2984 0.625 10.5845 0.743526 10.7955 0.954505C11.0065 1.16548 11.125 1.45163 11.125 1.75V8.875H18.25C18.5484 8.875 18.8345 8.99353 19.0455 9.2045C19.2565 9.41548 19.375 9.70163 19.375 10Z" />
              </svg>
            </button>
          </div>
          <button onClick={addToCart} className={`button ${style.button}`}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
