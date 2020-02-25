import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Swiper from "swiper/dist/js/swiper.js";
import "./navigationBar.css";
//import Swiper from "swiper";

//import "swiper/dist/css/swiper.min.css";
//import abbrImg from "../image/abbr.svg";

class Navigation extends Component {
  constructor(props) {
    super(props);
    /* this.state = {
      activeTabPosition: this.props.activeTabPosition
    };*/
  }
  componentDidMount() {
    let tabDiv = document.getElementById("tabs");
    if (tabDiv !== null && !this.tabSwiper) {
      this.tabSwiper = new Swiper("#tabs", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop: false,
        freeMode: true,
        effect: "slide",
        speed: 1000,
        slidesPerView: 4
      });

      // console.log("this swiper: ", this.tabSwiper);
    }
  }

  componentWillUnmount() {
    if (this.tabSwiper) {
      this.tabSwiper.destroy();
    }
  }

  componentDidUpdate() {
    if (this.tabSwiper) {
      this.tabSwiper.update();
    }
  }

  render() {
    if (this.tabSwiper) {
      //console.log("active index: ", this.props.activeIndex);
      if (this.props.activeIndex >= 3) {
        this.tabSwiper.slideTo(this.props.activeIndex - 2, 0);
      } else {
        this.tabSwiper.slideTo(0, 0);
      }
    }
    let list = this.props.list.map((item, index) => {
      let tabId = "tab-" + index;
      let listClass =
        index === this.props.activeIndex
          ? "swiper-slide navigation-item active"
          : "swiper-slide navigation-item no-active";
      /* let url = item.url.replace(new RegExp(PRE_FIX, "g"), "/");
      let lastSlashIndex = url.lastIndexOf("/");
      url = url.slice(0, lastSlashIndex);*/

      return (
        <div id={tabId} key={item.cate_id} className={listClass}>
          <Link to={item.url}>{item.title}</Link>
        </div>
      );
    });
    return (
      <div>
        <div className="navigation-menu-bar" id="menubar">
          <div className="nav-swiper-bar">
            <div className="swiper-container" id="tabs">
              <div className="swiper-wrapper">{list}</div>
            </div>
          </div>
        </div>
        <div className="seperate-div-less" id="menuTag" />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    activeIndex: state.activeMenuIndexReducer.activeIndex
  };
}

export default connect(mapStateToProps)(Navigation);
