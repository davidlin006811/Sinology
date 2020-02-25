import React from "react";
import logo from "../../img/logo.png";
//import SlideMenu from "../menu/menu";

const Banner = () => {
  return (
    <div className="banner">
      <img src={logo} alt="英國漢學院 Logo" style={{ width: "80%" }} />

      <p className="text-center">
        藉由漢學之研究，弘揚優秀傳統文化，溝通東西方文化
      </p>
    </div>
  );
};
export default Banner;
