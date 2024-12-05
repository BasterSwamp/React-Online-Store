import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ROUTES } from "../../utils/routes";
import { productsData } from "../../utils/data.js";

import ProductPage from "../ProductPage/ProductPage";
import ProductItem from "../ProductItem/ProductItem";
import { getRelatedProducts } from "../../features/products/productsSlice.js";

export default function SingleProduct() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const { related, list } = useSelector(({ products }) => products);

  const getProductById = (id) => {
    return productsData.flat().find((product) => product.id === Number(id));
  };

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchedProduct = getProductById(id);

    if (!fetchedProduct) {
      navigate(ROUTES.HOME);
    } else {
      setProduct(fetchedProduct);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!product || !list.length) return;

    dispatch(getRelatedProducts(product.category.id));
  }, [product, dispatch, !list.length]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ProductPage {...product} />
      <ProductItem
        title={"You might also like"}
        products={related}
        amount={4}
      />
    </div>
  );
}
