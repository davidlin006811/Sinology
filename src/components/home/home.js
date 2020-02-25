import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeContent, fetchHomeInfo } from "../../actions/homeAction";
import { setMenuIndex } from "../../actions/setActiveMenuAction";
import { isEmpty } from "../../common";
import HomeItems from "./homeItems";
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (this.props.activeIndex != 0) {
      this.props.setMenuIndex(0);
    }
  }
  componentDidMount() {
    if (this.props.home.menuItems.length <= 0) {
      this.props.fetchHomeContent();
    }
  }
  componentWillReceiveProps(nextProps) {
    //console.log("next props: ", nextProps);
    if (nextProps.home.isFetching) {
      return;
    }
    let menuLength = nextProps.home.menuItems.length;
    if (menuLength > 0 && isEmpty(nextProps.homeInfo)) {
      this.props.fetchHomeInfo(nextProps.home.menuItems[0].url);
    }
  }

  render() {
    //  console.log(this.props);
    const { menuItems } = this.props.home;
    const { homeInfo } = this.props;
    //console.log("homeInfo: ", homeInfo);
    let items;
    if (!isEmpty(homeInfo)) {
      items = <HomeItems homeInfo={homeInfo} />;
    }
    return <div>{items}</div>;
  }
}
function mapStateToProps(state) {
  return {
    home: state.homeReducer,
    homeInfo: state.homeInfoReducer.homeInfo,
    activeIndex: state.activeMenuIndexReducer.activeIndex
  };
}

export default connect(mapStateToProps, {
  fetchHomeContent,
  setMenuIndex,
  fetchHomeInfo
})(Home);
