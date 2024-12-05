import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";

import deleteIcon from "../../assets/icons/delete.svg";

import style from "./Cart.module.css";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ user }) => user);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (id, size) => {
    dispatch(removeItemFromCart({ id, size }));
  };

  const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);

  const subtotal = sumBy(cart.map(({ quantity, price }) => quantity * price));
  const discount = (subtotal * 0.2).toFixed(0);
  const totalPrice = subtotal - discount + 15;

  return (
    <section className="container">
      <h2 className={style.title}>Your cart</h2>

      {!cart.length ? (
        <div className={style.empty}>Here is empty 😟</div>
      ) : (
        <div className={style.content}>
          <div className={style.carts}>
            {cart.map((item) => {
              const { title, images, price, id, size, quantity } = item;

              return (
                <div key={`${id}-${size}`} className={style.bodyCart}>
                  <Link to={`/products/${id}`} className={style.cartImage}>
                    <img src={images[0]} alt="" />
                  </Link>
                  <div className={style.info}>
                    <div className={style.cartTop}>
                      <Link to={`/products/${id}`} className={style.cartTitle}>
                        <h3>{title}</h3>
                      </Link>
                      <button onClick={() => removeItem(item.id, item.size)}>
                        <img src={deleteIcon} alt="" />
                      </button>
                    </div>
                    {size && (
                      <div className={style.cartSize}>
                        Size: <span>{size}</span>
                      </div>
                    )}
                    <div className={style.cartBottom}>
                      <div className={style.price}>${price * quantity}</div>
                      <div className={style.counter}>
                        <button
                          onClick={() =>
                            changeQuantity(item, Math.max(1, quantity - 1))
                          }
                        >
                          <svg
                            viewBox="0 0 20 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={style.minus}
                          >
                            <path d="M19.375 2C19.375 2.29837 19.2565 2.58452 19.0455 2.79549C18.8345 3.00647 18.5484 3.125 18.25 3.125H1.75C1.45163 3.125 1.16548 3.00647 0.954505 2.79549C0.743526 2.58452 0.625 2.29837 0.625 2C0.625 1.70163 0.743526 1.41548 0.954505 1.2045C1.16548 0.993526 1.45163 0.875 1.75 0.875H18.25C18.5484 0.875 18.8345 0.993526 19.0455 1.2045C19.2565 1.41548 19.375 1.70163 19.375 2Z" />
                          </svg>
                        </button>
                        <span className={style.numberCounter}>{quantity}</span>
                        <button
                          onClick={() =>
                            changeQuantity(item, Math.max(1, quantity + 1))
                          }
                        >
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={style.plus}
                          >
                            <path d="M19.375 10C19.375 10.2984 19.2565 10.5845 19.0455 10.7955C18.8345 11.0065 18.5484 11.125 18.25 11.125H11.125V18.25C11.125 18.5484 11.0065 18.8345 10.7955 19.0455C10.5845 19.2565 10.2984 19.375 10 19.375C9.70163 19.375 9.41548 19.2565 9.2045 19.0455C8.99353 18.8345 8.875 18.5484 8.875 18.25V11.125H1.75C1.45163 11.125 1.16548 11.0065 0.954505 10.7955C0.743526 10.5845 0.625 10.2984 0.625 10C0.625 9.70163 0.743526 9.41548 0.954505 9.2045C1.16548 8.99353 1.45163 8.875 1.75 8.875H8.875V1.75C8.875 1.45163 8.99353 1.16548 9.2045 0.954505C9.41548 0.743526 9.70163 0.625 10 0.625C10.2984 0.625 10.5845 0.743526 10.7955 0.954505C11.0065 1.16548 11.125 1.45163 11.125 1.75V8.875H18.25C18.5484 8.875 18.8345 8.99353 19.0455 9.2045C19.2565 9.41548 19.375 9.70163 19.375 10Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.summary}>
            <h3 className={style.titleSummary}>Order Summary</h3>
            <ul className={style.list}>
              <li>
                <h4>Subtotal</h4>
                <span>${subtotal}</span>
              </li>
              <li>
                <h4>Discount (-20%)</h4>
                <span className={style.priceRed}>-${discount}</span>
              </li>
              <li>
                <h4>Delivery Fee</h4>
                <span>$15</span>
              </li>
            </ul>
            <div className={style.total}>
              <h4>Total</h4>
              <span className={style.price}>${totalPrice}</span>
            </div>
            <button className={`button ${style.button}`}>Go to Checkout</button>
          </div>
        </div>
      )}
    </section>
  );
}
