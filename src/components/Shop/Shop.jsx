import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "../ProductItem/ProductItem";
import style from "../Category/Category.module.css";
import Filter from "../Filter/Filter";

export default function Shop({ filterCondition, title }) {
  const dispatch = useDispatch();
  const { list: products, isLoading } = useSelector((state) => state.products);

  const defaultValues = {
    title: "",
    price_min: "",
    price_max: "",
    sortOrder: "",
  };
  const defaultParams = {
    ...defaultValues,
    limit: 8,
  };

  const [params, setParams] = useState(defaultParams);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    if (!products.length) {
      dispatch({ type: "products/fetchAll" });
    }
  }, [dispatch, products]);

  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesCondition = filterCondition(product);
      const matchesTitle =
        params.title === "" ||
        product.title.toLowerCase().includes(params.title.toLowerCase());
      const matchesPrice =
        (params.price_min === "" ||
          product.price >= Number(params.price_min)) &&
        (params.price_max === "" || product.price <= Number(params.price_max));

      return matchesCondition && matchesTitle && matchesPrice;
    });

    if (params.sortOrder === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (params.sortOrder === "desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setVisibleProducts(filtered.slice(0, params.limit));
  }, [products, params, filterCondition]);

  const handleShowMore = () => {
    setParams((prevParams) => ({
      ...prevParams,
      limit: prevParams.limit + defaultParams.limit,
    }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className={`container ${style.container}`}>
        <h2 className={style.title}>{title}</h2>
        <Filter setParams={setParams} defaultValues={defaultParams} />
      </div>
      {!filteredProducts.length ? (
        <div className={`container ${style.empty}`}>No products available</div>
      ) : (
        <>
          <ProductItem
            products={visibleProducts}
            amount={visibleProducts.length}
          />
          {visibleProducts.length < filteredProducts.length && (
            <div className={style.more}>
              <button
                onClick={handleShowMore}
                className={`button ${style.button}`}
              >
                See More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
