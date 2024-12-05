import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import Home from "../Home/Home";
import SingleProduct from "../SingleProduct/SingleProduct";
import Category from "../Category/Category";
import Cart from "../Cart/Cart";
import Shop from "../Shop/Shop";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
        <Route path={ROUTES.CATEGORY} element={<Category />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route
          path={ROUTES.SHOP}
          element={
            <Shop filterCondition={(product) => product} title="All Products" />
          }
        />
        <Route
          path={ROUTES.NEW_ARRIVALS}
          element={
            <Shop
              filterCondition={(product) => product.oldPrice == undefined}
              title="New Arrivals"
            />
          }
        />
        <Route
          path={ROUTES.ON_SALE}
          element={
            <Shop
              filterCondition={(product) => product.oldPrice !== undefined}
              title="On Sales"
            />
          }
        />
      </Routes>
    </>
  );
}
