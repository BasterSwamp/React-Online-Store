import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "../ProductItem/ProductItem";
import Filter from "../Filter/Filter";
import { getRelatedProducts } from "../../features/products/productsSlice";

import style from "./Category.module.css";

export default function Category() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { related, isLoading } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories.list);

  const category = categories.find((cat) => cat.id === Number(id));

  const defaultValues = {
    title: "",
    price_min: "",
    price_max: "",
    sortOrder: "",
  };

  const defaultParams = {
    ...defaultValues,
    limit: 4,
    categoryId: id,
  };

  const [params, setParams] = useState(defaultParams);
  const [filteredProducts, setFilteredProducts] = useState(related);
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    if (category) {
      dispatch(getRelatedProducts(Number(id)));
    }
  }, [dispatch, id, category]);

  useEffect(() => {
    if (!params) return;

    let filtered = related.filter((product) => {
      const matchesTitle =
        params.title === "" ||
        product.title.toLowerCase().includes(params.title.toLowerCase());

      const matchesPrice =
        (params.price_min === "" ||
          product.price >= Number(params.price_min)) &&
        (params.price_max === "" || product.price <= Number(params.price_max));

      return matchesTitle && matchesPrice;
    });

    if (params.sortOrder === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (params.sortOrder === "desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setVisibleProducts(filtered.slice(0, params.limit));
  }, [params, related]);

  const handleShowMore = () => {
    setParams((prevParams) => ({
      ...prevParams,
      limit: prevParams.limit + defaultParams.limit,
    }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!category) {
    return (
      <div className={`container ${style.empty}`}>Category not found 😟</div>
    );
  }

  return (
    <section>
      <div className={`container ${style.container}`}>
        <h2 className={style.title}>{category.name}</h2>
        <Filter setParams={setParams} defaultValues={defaultValues} />
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
