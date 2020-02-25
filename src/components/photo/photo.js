import React, { Component } from "react";
import MediaQuery from "react-responsive";
import closeIcon from "../../img/close.png";
import "./photo.css";
import Swiper from "swiper/dist/js/swiper";
class Photo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.picSwiper = new Swiper(this.swiperId, {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    });
  }
  componentDidUpdate() {
    this.picSwiper.update();
  }
  render() {
    if (this.picSwiper) {
      this.picSwiper.update();
    }
    return (
      <div className="pic-component">
        <div className="swiper-container" ref={self => (this.swiperId = self)}>
          <div className="swiper-wrapper">
            {this.props.items.map((item, index) => {
              const position = index + 1 + "/" + this.props.items.length;

              return (
                <div className="swiper-slide" key={index}>
                  <MediaQuery query="(orientation: portrait)">
                    <div className="pic-navigation">
                      <div className="close">
                        <img
                          src={closeIcon}
                          alt="close"
                          onClick={this.props.hidePhoto}
                        />
                      </div>
                      <h3>
                        {this.props.title}
                        <span>{position}</span>
                      </h3>
                    </div>
                    <img src={item.picture} alt="slider" />
                  </MediaQuery>
                  <MediaQuery query="(orientation: landscape)">
                    <div className="pic-navigation-landscape">
                      <img
                        src={closeIcon}
                        alt="close"
                        onClick={this.props.hidePhoto}
                      />

                      <div>
                        {this.props.title}
                        <span>{position}</span>
                      </div>
                    </div>
                    <img src={item.picture} alt="slider" />
                  </MediaQuery>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Photo;
