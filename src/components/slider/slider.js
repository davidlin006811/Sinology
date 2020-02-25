import React from "react";
//import Swiper from "react-id-swiper";
import Swiper from "react-id-swiper/lib/ReactIdSwiper.full";
//import "react-id-swiper/src/styles/css/swiper.css";
//import { Pagination, Navigation } from "swiper/dist/js/swiper.esm";
import { Link } from "react-router-dom";
import "./slider.css";

const Slider = props => {
  //console.log("slide props: ", props);
  const params = {
    direction: "horizontal",
    //modules: [Pagination],
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    loop: true,
    slidesPerView: "auto",
    effect: "slide",
    shouldSwiperUpdate: true
  };
  let title, list;
  if (props.type === "video") {
    title = "視頻";
    list = props.items.rows.map(item => {
      let url = "/video/info?url=" + item.video_url;
      console.log("item cover: ", item.cover);
      return (
        <div key={item.id} style={{ width: "100%" }} className="slide-item">
          <Link to={url}>
            <div className="slide-title">
              <p>{item.title}</p>
            </div>
            <div style={{ backgroundImage: "url(" + item.cover + ")" }} />
          </Link>
        </div>
      );
    });
  }

  return (
    <div>
      <Swiper {...params}>{list}</Swiper>
    </div>
  );
};
export default Slider;
