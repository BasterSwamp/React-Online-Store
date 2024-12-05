import VersaceLogo from "../../assets/Versace.svg";
import ZaraLogo from "../../assets/Zara.svg";
import GucciLogo from "../../assets/Gucci.svg";
import PradaLogo from "../../assets/Prada.svg";
import CalvinKleinLogo from "../../assets/CalvinKlein.svg";
import style from "./Ticker.module.css";

const logos = [VersaceLogo, ZaraLogo, GucciLogo, PradaLogo, CalvinKleinLogo];

export default function Ticker() {
  return (
    <div className={style.ticker}>
      <div className={style.tickerBody}>
        {Array(2)
          .fill(null)
          .map((_, ind) => (
            <div key={ind} className={style.tickerContent}>
              {logos.map((logo, index) => (
                <img key={`${ind}-${index}`} src={logo} alt="" />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
