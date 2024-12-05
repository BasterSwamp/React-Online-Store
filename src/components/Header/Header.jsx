import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterProducts } from "../../features/products/productsSlice";

import searchIcon from "../../assets/icons/search.svg";
import searchBlackIcon from "../../assets/icons/searchBlack.svg";
import cartIcon from "../../assets/icons/cart.svg";
import burgerIcon from "../../assets/icons/burger.svg";

import style from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const boxRef = useRef(null);
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 991);
  const [activeElement, setActiveElement] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const { cart } = useSelector(({ user }) => user);

  const { filtered: products, isLoading } = useSelector(
    (state) => state.products
  );

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
    dispatch(filterProducts(value));
  };

  const toggleMenu = () => {
    setActiveElement((prev) => (prev === "menu" ? null : "menu"));
  };

  const toggleSearch = () => {
    setActiveElement((prev) => (prev === "search" ? null : "search"));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setActiveElement(null);
    setSearchValue("");
  }, [location.pathname]);

  return (
    <header className="container">
      <div className={style.logoBody}>
        {isMobile && (
          <button className={style.burger} onClick={toggleMenu}>
            <img src={burgerIcon} alt="" />
          </button>
        )}
        <Link className={style.logo} to={ROUTES.HOME}>
          SHOP.CO
        </Link>
      </div>
      <ul
        className={
          isMobile
            ? activeElement === "menu"
              ? `${style.activeNav} ${style.nav}`
              : style.nav
            : style.nav
        }
      >
        <li>
          <Link to={ROUTES.SHOP}>Shop</Link>
        </li>
        <li>
          <Link to={ROUTES.ON_SALE}>On Sale</Link>
        </li>
        <li>
          <Link to={ROUTES.NEW_ARRIVALS}>New Arrivals</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Brands</Link>
        </li>
      </ul>
      <div
        className={
          isMobile
            ? activeElement === "search"
              ? `${style.activeBody} ${style.inputBody}`
              : style.inputBody
            : style.inputBody
        }
      >
        <input
          type="search"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          onChange={handleSearch}
          value={searchValue}
        />
        <img src={searchIcon} className={style.inputIcon} alt="" />
        {searchValue && (
          <div className={style.box} ref={boxRef}>
            {isLoading
              ? "Loading..."
              : !products.length
              ? "No results"
              : products.slice(0, 5).map(({ title, images, id, price }) => (
                  <Link
                    to={`/products/${id}`}
                    key={id}
                    className={style.boxLink}
                    onClick={() => setSearchValue("")}
                  >
                    <img src={images[0]} alt="" className={style.boxPreview} />
                    <div className={style.boxInfo}>
                      <h5 className={style.boxTitle}>{title}</h5>
                      <span className={style.boxPrice}>${price}</span>
                    </div>
                  </Link>
                ))}
          </div>
        )}
      </div>
      <div className={style.tools}>
        {isMobile && (
          <button onClick={toggleSearch}>
            <img src={searchBlackIcon} alt="" />
          </button>
        )}
        <Link to={ROUTES.CART} className={style.cart}>
          <img src={cartIcon} alt="" />
          {!!cart.length && <span>{cart.length}</span>}
        </Link>
      </div>
    </header>
  );
}
