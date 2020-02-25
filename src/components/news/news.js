import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeContent } from "../../actions/homeAction";
import { fetchItems } from "../../actions/action";
import { isEmpty } from "../../common";
import { setMenuIndex } from "../../actions/setActiveMenuAction";
import {
  REQUEST_NEWS_2019,
  RECEIVE_NEWS_2019,
  REQUEST_NEWS_2018,
  RECEIVE_NEWS_2018
} from "../../actions/types";
import { PRE_FIX } from "../../config";
import NewsItems from "./newsItem";
class News extends Component {
  constructor(props) {
    super(props);
    this.windowWidth = innerWidth * 0.9;
  }
  componentWillMount() {
    this.props.setMenuIndex(5);
  }
  componentDidMount() {
    //console.log("prop: ", this.props);
    if (this.props.menuItems.length <= 0) {
      this.props.fetchHomeContent();
    } else {
      if (isEmpty(this.props.news.news_2019)) {
        let url = PRE_FIX + this.props.menuItems[5].sub_category[0].url;
        this.props.fetchItems(url, REQUEST_NEWS_2019, RECEIVE_NEWS_2019);
      }
      if (isEmpty(this.props.news.news_2018)) {
        let url = PRE_FIX + this.props.menuItems[5].sub_category[1].url;
        this.props.fetchItems(url, REQUEST_NEWS_2018, RECEIVE_NEWS_2018);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.news.isNews2019Fetching ||
      nextProps.news.isNews2018Fetching
    ) {
      return;
    }
    //console.log("next props: ", nextProps);
    let menuLength = nextProps.menuItems.length;

    if (menuLength > 0 && isEmpty(nextProps.news.news_2019)) {
      let url = PRE_FIX + nextProps.menuItems[5].sub_category[0].url;
      this.props.fetchItems(url, REQUEST_NEWS_2019, RECEIVE_NEWS_2019);
    }
    if (menuLength > 0 && isEmpty(nextProps.news.news_2018)) {
      let url = PRE_FIX + nextProps.menuItems[5].sub_category[1].url;
      this.props.fetchItems(url, REQUEST_NEWS_2018, RECEIVE_NEWS_2018);
    }
  }
  render() {
    const { news_2019, news_2018 } = this.props.news;
    let news2019, news2018, menuItems;
    if (!isEmpty(news_2019)) {
      news2019 = <NewsItems item={news_2019.rows} id="news2019" />;
    }
    if (!isEmpty(news_2018)) {
      news2018 = <NewsItems item={news_2018.rows} id="news2018" />;
    }
    if (this.props.menuItems.length > 0) {
      let links = ["#news2019", "#news2018"];
      menuItems = this.props.menuItems[5].sub_category.map((item, index) => {
        let width =
          this.windowWidth / this.props.menuItems[5].sub_category.length;
        return (
          <div
            className="profile-menu-item"
            style={{ width: width }}
            key={index}
          >
            <a href={links[index]}>{item.title}</a>
          </div>
        );
      });
    }
    return (
      <div style={{ padding: "0 10px" }}>
        <div className="menu clearfix">{menuItems}</div>
        {news2019}
        {news2018}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    menuItems: state.homeReducer.menuItems,
    news: state.newsReducer
  };
}

export default connect(mapStateToProps, {
  fetchHomeContent,
  fetchItems,
  setMenuIndex
})(News);
