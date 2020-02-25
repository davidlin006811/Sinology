import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeContent } from "../../actions/homeAction";
import { fetchItems } from "../../actions/action";
import { isEmpty } from "../../common";
import { setMenuIndex } from "../../actions/setActiveMenuAction";
import TutorItems from "./tutorItem";
import ReasonItems from "./reasonItem";
import IdeaItems from "./ideaItem";
import StructItems from "./structItem";
import {
  REQUEST_PROFILE_TUTOR,
  RECEIVE_PROFILE_TUTOR,
  REQUEST_PROFILE_REASON,
  RECEIVE_PROFILE_REASON,
  REQUEST_PROFILE_IDEA,
  RECEIVE_PROFILE_IDEA,
  REQUEST_PROFILE_STRUCT,
  RECEIVE_PROFILE_STRUCT
} from "../../actions/types";
import { PRE_FIX } from "../../config";

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.setMenuIndex(1);
  }
  componentDidMount() {
    if (this.props.menuItems.length <= 0) {
      this.props.fetchHomeContent();
    } else {
      if (isEmpty(this.props.profile.tutor)) {
        let url = PRE_FIX + this.props.menuItems[1].sub_category[0].url;
        this.props.fetchItems(
          url,
          REQUEST_PROFILE_TUTOR,
          RECEIVE_PROFILE_TUTOR
        );
      }
      if (isEmpty(this.props.profile.reason)) {
        let url = PRE_FIX + this.props.menuItems[1].sub_category[1].url;
        this.props.fetchItems(
          url,
          REQUEST_PROFILE_REASON,
          RECEIVE_PROFILE_REASON
        );
      }
      if (isEmpty(this.props.profile.idea)) {
        let url = PRE_FIX + this.props.menuItems[1].sub_category[2].url;
        this.props.fetchItems(url, REQUEST_PROFILE_IDEA, RECEIVE_PROFILE_IDEA);
      }
      /* if (isEmpty(this.props.profile.struct)) {
        let url = PRE_FIX + this.props.menuItems[1].sub_category[3].url;
        this.props.fetchItems(
          url,
          REQUEST_PROFILE_STRUCT,
          RECEIVE_PROFILE_STRUCT
        );
      }*/
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.profile.isTutorFetching ||
      nextProps.profile.isReasonFetching ||
      nextProps.profile.isIdeaFetching ||
      nextProps.profile.isStructFetching
    ) {
      return;
    }
    //console.log("next props: ", nextProps);
    let menuLength = nextProps.menuItems.length;
    //console.log("tutor empty: ", isEmpty(nextProps.profile.tutor));
    if (menuLength > 0 && isEmpty(nextProps.profile.tutor)) {
      let url = PRE_FIX + nextProps.menuItems[1].sub_category[0].url;
      this.props.fetchItems(url, REQUEST_PROFILE_TUTOR, RECEIVE_PROFILE_TUTOR);
    }
    if (menuLength > 0 && isEmpty(this.props.profile.reason)) {
      let url = PRE_FIX + nextProps.menuItems[1].sub_category[1].url;
      this.props.fetchItems(
        url,
        REQUEST_PROFILE_REASON,
        RECEIVE_PROFILE_REASON
      );
    }
    if (menuLength > 0 && isEmpty(this.props.profile.idea)) {
      let url = PRE_FIX + nextProps.menuItems[1].sub_category[2].url;
      this.props.fetchItems(url, REQUEST_PROFILE_IDEA, RECEIVE_PROFILE_IDEA);
    }
    /*if (menuLength > 0 && isEmpty(this.props.profile.struct)) {
      let url = PRE_FIX + nextProps.menuItems[1].sub_category[3].url;
      this.props.fetchItems(
        url,
        REQUEST_PROFILE_STRUCT,
        RECEIVE_PROFILE_STRUCT
      );
    }*/
  }
  render() {
    //console.log(this.props);
    const { profile } = this.props;
    //console.log("profile: ", profile);
    let menuItems, tutorItems, reasonItems, ideaItems, structItems;
    if (!isEmpty(profile.tutor)) {
      tutorItems = <TutorItems tutor={profile.tutor} />;
    }
    if (!isEmpty(profile.reason)) {
      reasonItems = <ReasonItems reason={profile.reason} />;
    }
    if (!isEmpty(profile.idea)) {
      ideaItems = <IdeaItems idea={profile.idea} />;
    }
    if (!isEmpty(profile.struct)) {
      structItems = <StructItems struct={profile.struct} />;
    }
    if (this.props.menuItems.length > 0) {
      let links = ["#tutor", "#reason", "#idea", "#struct"];
      menuItems = this.props.menuItems[1].sub_category.map((item, index) => {
        let itemLength =
          (1 / this.props.menuItems[1].sub_category.length) * 100 + "%";
        //console.log("length: ", itemLength);
        return (
          <div
            className="profile-menu-item"
            style={{ width: itemLength }}
            key={index}
          >
            <a href={links[index]}>{item.title}</a>
          </div>
        );
      });
    }
    return (
      <div id="profile" style={{ padding: "0 10px" }}>
        <div className="menu">{menuItems}</div>

        {tutorItems}
        {reasonItems}
        {ideaItems}
        {structItems}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    menuItems: state.homeReducer.menuItems,
    profile: state.profileReducer
  };
}

export default connect(mapStateToProps, {
  fetchHomeContent,
  fetchItems,
  setMenuIndex
})(Profile);
