import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { filterByPrice } from "../../features/products/productsSlice";
import { ROUTES } from "../../utils/routes";

import Hero from "../Hero/Hero";
import ProductItem from "../ProductItem/ProductItem";
import Feedback from "../Feedback/Feedback";
import Ticker from "../Ticker/Ticker";
import Categories from "../Categories/Categories";

import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const { list, filtered, isLoading } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (!isLoading && list.length > 0) {
      dispatch(filterByPrice(500));
    }
  }, [dispatch, isLoading, list]);

  return (
    <div className={style}>
      <Hero />
      <Ticker />
      <div className={`container ${style.container}`}>
        <div className={style.section}>
          <ProductItem
            title={"NEW ARRIVALS"}
            products={filtered.filter((product) => !product.oldPrice)}
            amount={4}
          />
          <Link to={ROUTES.NEW_ARRIVALS} className={style.link}>
            View All
          </Link>
        </div>
        <hr className={style.border} />
        <div className={style.section}>
          <ProductItem title={"TOP SELLING"} products={filtered} amount={4} />
          <Link to={ROUTES.ON_SALE} className={style.link}>
            View All
          </Link>
        </div>
        <Categories
          title={"BROWSE BY dress STYLE"}
          products={categories.list}
          amount={4}
        />
      </div>
      <Feedback title="OUR HAPPY CUSTOMERS" />
    </div>
  );
}
