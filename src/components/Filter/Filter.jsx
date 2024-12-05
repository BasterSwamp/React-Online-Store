import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import filterDown from "../../assets/icons/filterDown.svg";
import filterUp from "../../assets/icons/filterUp.svg";

import style from "./Filter.module.css";

export default function Filter({ setParams, defaultValues }) {
  const location = useLocation();
  const [values, setValues] = useState(defaultValues);
  const [sortOrder, setSortOrder] = useState("");

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    setParams((prevParams) => ({
      ...prevParams,
      sortOrder: newSortOrder,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setParams((prevParams) => ({
      ...prevParams,
      title: values.title,
      price_min: values.price_min === "" ? 0 : Number(values.price_min),
      price_max: values.price_max === "" ? Infinity : Number(values.price_max),
    }));
  };

  useEffect(() => {
    const isValuesDefault = Object.keys(defaultValues).every(
      (key) => values[key] === defaultValues[key]
    );

    if (!isValuesDefault) {
      setValues(defaultValues);
      setParams((prevParams) => ({
        ...prevParams,
        ...defaultValues,
      }));
    }

    if (sortOrder !== "") {
      setSortOrder("");
      setParams((prevParams) => ({
        ...prevParams,
        sortOrder: "",
      }));
    }
  }, [location.pathname]);

  return (
    <form onSubmit={handleSubmit} className={style.filterBody}>
      <div className={style.filterInputs}>
        <input
          type="text"
          name="title"
          placeholder="Product name"
          className={style.input}
          onChange={handleChange}
          value={values.title}
        />
        <input
          type="number"
          name="price_min"
          placeholder="Price min"
          className={style.input}
          onChange={handleChange}
          value={values.price_min}
        />
        <input
          type="number"
          name="price_max"
          placeholder="Price max"
          className={style.input}
          onChange={handleChange}
          value={values.price_max}
        />
      </div>
      <div className={style.sortButtonWrapper}>
        <button
          type="button"
          onClick={handleSortToggle}
          className={style.sortButton}
        >
          {sortOrder === "asc" ? (
            <img src={filterDown} alt="" />
          ) : (
            <img src={filterUp} alt="" />
          )}
        </button>
      </div>
      <button type="submit" hidden></button>
    </form>
  );
}
