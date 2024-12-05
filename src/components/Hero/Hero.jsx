import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";

import mainBanner from "../../assets/main-banner.jpg";

import style from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={style.mainBanner}>
      <div className={`container ${style.container}`}>
        <div className={style.info}>
          <div>
            <h1 className={style.title}>
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className={style.description}>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Link to={ROUTES.SHOP} className={`button ${style.button}`}>
              Shop Now
            </Link>
          </div>
          <ul>
            <li>
              <h4>200+</h4>
              <span>International Brands</span>
            </li>
            <li>
              <h4>2,000+</h4>
              <span>High-Quality Products</span>
            </li>
            <li>
              <h4>30,000+</h4>
              <span>Happy Customers</span>
            </li>
          </ul>
        </div>
        <div className={style.bannerImg}>
          <img src={mainBanner} alt="" />
        </div>
      </div>
    </div>
  );
}
