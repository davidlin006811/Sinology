import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeContent } from "../../actions/homeAction";
import { fetchItems } from "../../actions/action";
import { isEmpty } from "../../common";
import { setMenuIndex } from "../../actions/setActiveMenuAction";
import {
  REQUEST_ENROLLMENT_RECRUIT,
  RECEIVE_ENROLLMENT_RECRUIT,
  REQUEST_ENROLLMENT_EMPLOYMENT,
  RECEIVE_ENROLLMENT_EMPLOYMENT,
  REQUEST_ENROLLMENT_ALUMNI,
  RECEIVE_ENROLLMENT_ALUMNI
} from "../../actions/types";
import { PRE_FIX } from "../../config";
import RecruitItems from "./recruitItem";
import EmploymentItems from "./employmentItem";
import AlumniItems from "./alumniItem";
class Enrollment extends Component {
  constructor(props) {
    super(props);
    this.windowWidth = window.innerWidth * 0.9;
  }
  componentWillMount() {
    this.props.setMenuIndex(4);
  }
  componentDidMount() {
    // console.log("prop: ", this.props);
    if (this.props.menuItems.length <= 0) {
      this.props.fetchHomeContent();
    } else {
      if (isEmpty(this.props.enrollment.recruit)) {
        let url = PRE_FIX + this.props.menuItems[4].sub_category[0].url;

        this.props.fetchItems(
          url,
          REQUEST_ENROLLMENT_RECRUIT,
          RECEIVE_ENROLLMENT_RECRUIT
        );
      }
      if (isEmpty(this.props.enrollment.employment)) {
        let url = PRE_FIX + this.props.menuItems[4].sub_category[1].url;
        this.props.fetchItems(
          url,
          REQUEST_ENROLLMENT_EMPLOYMENT,
          RECEIVE_ENROLLMENT_EMPLOYMENT
        );
      }
      if (isEmpty(this.props.enrollment.alumni)) {
        let url = PRE_FIX + this.props.menuItems[4].sub_category[2].url;
        this.props.fetchItems(
          url,
          REQUEST_ENROLLMENT_ALUMNI,
          RECEIVE_ENROLLMENT_ALUMNI
        );
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.enrollment.isRecruitFetching ||
      nextProps.enrollment.isEmploymentFetching ||
      nextProps.enrollment.isAlumniFetching
    ) {
      return;
    }
    //console.log("next props: ", nextProps);
    let menuLength = nextProps.menuItems.length;

    if (menuLength > 0 && isEmpty(nextProps.enrollment.recruit)) {
      let url = PRE_FIX + nextProps.menuItems[4].sub_category[0].url;
      this.props.fetchItems(
        url,
        REQUEST_ENROLLMENT_RECRUIT,
        RECEIVE_ENROLLMENT_RECRUIT
      );
    }
    if (menuLength > 0 && isEmpty(this.props.enrollment.employment)) {
      let url = PRE_FIX + nextProps.menuItems[4].sub_category[1].url;
      this.props.fetchItems(
        url,
        REQUEST_ENROLLMENT_EMPLOYMENT,
        RECEIVE_ENROLLMENT_EMPLOYMENT
      );
    }
    if (menuLength > 0 && isEmpty(this.props.enrollment.alumni)) {
      let url = PRE_FIX + nextProps.menuItems[4].sub_category[2].url;
      this.props.fetchItems(
        url,
        REQUEST_ENROLLMENT_ALUMNI,
        RECEIVE_ENROLLMENT_ALUMNI
      );
    }
  }
  render() {
    const { recruit, employment, alumni } = this.props.enrollment;
    let recruitItem, employmentItem, alumniItems, menuItems;
    if (!isEmpty(recruit)) {
      recruitItem = <RecruitItems recruit={recruit} />;
    }
    if (!isEmpty(employment)) {
      employmentItem = <EmploymentItems employment={employment} />;
    }
    if (!isEmpty(alumni)) {
      alumniItems = <AlumniItems alumni={alumni} />;
    }
    if (this.props.menuItems.length > 0) {
      let links = ["#recruit", "#employment", "#alumni"];
      menuItems = this.props.menuItems[4].sub_category.map((item, index) => {
        let width = parseInt(
          this.windowWidth / this.props.menuItems[4].sub_category.length
        );

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
        <div className="menu clearfix" id="enrollMenu">
          {menuItems}
        </div>
        {recruitItem}
        {employmentItem}
        {alumniItems}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    menuItems: state.homeReducer.menuItems,
    enrollment: state.enrollmentReducer
  };
}

export default connect(mapStateToProps, {
  fetchHomeContent,
  fetchItems,
  setMenuIndex
})(Enrollment);
