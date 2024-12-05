import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import starIcon from "../../assets/icons/star.svg";
import confirmIcon from "../../assets/icons/confirm.svg";
import prevIcon from "../../assets/icons/arrow-prev.svg";
import nextIcon from "../../assets/icons/arrow-next.svg";

import style from "./Feedback.module.css";

import { feedbackDataCustomers } from "../../utils/data.js";

export default function Feedback({ title }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setComments(feedbackDataCustomers);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.body}>
      <div className={`container ${style.container}`}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.navigation}>
          <div className={style.btnPrev} id="prevButton">
            <img src={prevIcon} alt="" />
          </div>
          <div className={style.btnNext} id="nextButton">
            <img src={nextIcon} alt="" />
          </div>
        </div>
        <Swiper
          className={style.gallary}
          loop={true}
          autoplay={{ delay: 3000 }}
          centeredSlides={true}
          slidesPerGroup={1}
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            767.98: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            991.98: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1269.98: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          navigation={{
            prevEl: "#prevButton",
            nextEl: "#nextButton",
          }}
        >
          {comments.map((comment) => (
            <SwiperSlide key={comment.id} className={style.slide}>
              <div className={style.stars}>
                {Array.from({ length: comment.rate }).map((_, index) => (
                  <img src={starIcon} key={index} />
                ))}
              </div>
              <h4 className={style.name}>
                {comment.name}
                <img src={confirmIcon} />
              </h4>
              <p className={style.description}>{`"${comment.text}"`}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
