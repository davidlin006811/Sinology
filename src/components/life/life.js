import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeContent } from "../../actions/homeAction";
import { fetchItems } from "../../actions/action";
import { isEmpty } from "../../common";
import { setMenuIndex } from "../../actions/setActiveMenuAction";
import {
  REQUEST_LIFE_SCENERY,
  RECEIVE_LIFE_SCENERY,
  REQUEST_LIFE_FACILITIES,
  RECEIVE_LIFE_FACILITIES,
  REQUEST_LIFE_LEARNING,
  RECEIVE_LIFE_LEARNING,
  REQUEST_LIFE_SILHOUETTE,
  RECEIVE_LIFE_SILHOUETTE,
  REQUEST_LIFE_DAILYLIFE,
  RECEIVE_LIFE_DAILYLIFE
} from "../../actions/types";
import { PRE_FIX } from "../../config";
import SceneryItems from "./sceneryItem";
import AlbumItems from "./albumItems";
class Life extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.setMenuIndex(3);
  }
  componentDidMount() {
    //console.log("prop: ", this.props);
    if (this.props.menuItems.length <= 0) {
      this.props.fetchHomeContent();
    } else {
      if (isEmpty(this.props.life.scenery)) {
        let url = PRE_FIX + this.props.menuItems[3].sub_category[0].url;

        this.props.fetchItems(url, REQUEST_LIFE_SCENERY, RECEIVE_LIFE_SCENERY);
      }
      if (isEmpty(this.props.life.facilities)) {
        let url = PRE_FIX + this.props.menuItems[3].sub_category[1].url;
        this.props.fetchItems(
          url,
          REQUEST_LIFE_FACILITIES,
          RECEIVE_LIFE_FACILITIES
        );
      }
      if (isEmpty(this.props.life.learning)) {
        let url = PRE_FIX + this.props.menuItems[3].sub_category[2].url;
        this.props.fetchItems(
          url,
          REQUEST_LIFE_LEARNING,
          RECEIVE_LIFE_LEARNING
        );
      }
      if (isEmpty(this.props.life.silhouette)) {
        let url = PRE_FIX + this.props.menuItems[3].sub_category[3].url;
        this.props.fetchItems(
          url,
          REQUEST_LIFE_SILHOUETTE,
          RECEIVE_LIFE_SILHOUETTE
        );
      }
      if (isEmpty(this.props.life.dailylife)) {
        let url = PRE_FIX + this.props.menuItems[3].sub_category[4].url;
        this.props.fetchItems(
          url,
          REQUEST_LIFE_DAILYLIFE,
          RECEIVE_LIFE_DAILYLIFE
        );
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.life.isSceneryFetching ||
      nextProps.life.isFacilitiesFetching ||
      nextProps.life.isLearningFetching ||
      nextProps.life.isSilhouettFetching ||
      nextProps.life.isDailylifeFetching
    ) {
      return;
    }
    //console.log("next props: ", nextProps);
    let menuLength = nextProps.menuItems.length;

    if (menuLength > 0 && isEmpty(nextProps.life.scenery)) {
      let url = PRE_FIX + nextProps.menuItems[3].sub_category[0].url;
      this.props.fetchItems(url, REQUEST_LIFE_SCENERY, RECEIVE_LIFE_SCENERY);
    }
    if (menuLength > 0 && isEmpty(this.props.life.facilities)) {
      let url = PRE_FIX + nextProps.menuItems[3].sub_category[1].url;
      this.props.fetchItems(
        url,
        REQUEST_LIFE_FACILITIES,
        RECEIVE_LIFE_FACILITIES
      );
    }
    if (menuLength > 0 && isEmpty(this.props.life.learning)) {
      let url = PRE_FIX + nextProps.menuItems[3].sub_category[2].url;
      this.props.fetchItems(url, REQUEST_LIFE_LEARNING, RECEIVE_LIFE_LEARNING);
    }
    if (menuLength > 0 && isEmpty(this.props.life.silhouette)) {
      let url = PRE_FIX + nextProps.menuItems[3].sub_category[3].url;
      this.props.fetchItems(
        url,
        REQUEST_LIFE_SILHOUETTE,
        RECEIVE_LIFE_SILHOUETTE
      );
    }
    if (menuLength > 0 && isEmpty(this.props.life.dailylife)) {
      let url = PRE_FIX + nextProps.menuItems[3].sub_category[4].url;
      this.props.fetchItems(
        url,
        REQUEST_LIFE_DAILYLIFE,
        RECEIVE_LIFE_DAILYLIFE
      );
    }
  }
  render() {
    const {
      scenery,
      facilities,
      learning,
      silhouette,
      dailylife
    } = this.props.life;

    let menuItems,
      sceneryItem,
      facilitiesItem,
      learningItems,
      silhouetteItems,
      dailylifeItems;
    if (!isEmpty(scenery)) {
      sceneryItem = <SceneryItems scenery={scenery} />;
    }
    if (!isEmpty(facilities)) {
      facilitiesItem = <AlbumItems items={facilities} id="facilities" />;
    }
    if (!isEmpty(learning)) {
      learningItems = <AlbumItems items={learning} id="learning" />;
    }
    if (!isEmpty(silhouette)) {
      silhouetteItems = <AlbumItems items={silhouette} id="silhouette" />;
    }
    if (!isEmpty(dailylife)) {
      dailylifeItems = <AlbumItems items={dailylife} id="dailylife" />;
    }
    if (this.props.menuItems.length > 0) {
      let links = [
        "#scenery",
        "#facilities",
        "#learning",
        "#silhouette",
        "#dailylife"
      ];
      menuItems = this.props.menuItems[3].sub_category.map((item, index) => {
        return (
          <div className="profile-menu-item" key={index} id="lifeMenu">
            <a href={links[index]}>{item.title}</a>
          </div>
        );
      });
    }
    return (
      <div style={{ padding: "0 10px" }}>
        <div className="menu clearfix">{menuItems}</div>
        {sceneryItem}
        {facilitiesItem}
        {learningItems}
        {silhouetteItems}
        {dailylifeItems}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    menuItems: state.homeReducer.menuItems,
    life: state.lifeReducer
  };
}

export default connect(mapStateToProps, {
  fetchHomeContent,
  fetchItems,
  setMenuIndex
})(Life);
