import AppRoutes from "./components/Routes/Routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "./features/categories/categoriesSlice";
import { getProducts } from "./features/products/productsSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="content">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}
