import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeContent } from "../../actions/homeAction";
import { fetchItems } from "../../actions/action";
import { isEmpty } from "../../common";
import { setMenuIndex } from "../../actions/setActiveMenuAction";
import {
  REQUEST_TEACHING_STAFF,
  RECEIVE_TEACHING_STAFF,
  REQUEST_TEACHING_COURSE,
  RECEIVE_TEACHING_COURSE,
  REQUEST_TEACHING_MORAL,
  RECEIVE_TEACHING_MORAL,
  REQUEST_TEACHING_INTERNSHIP,
  RECEIVE_TEACHING_INTERNSHIP,
  REQUEST_TEACHING_RESOURCE,
  RECEIVE_TEACHING_RESOURCE
} from "../../actions/types";
import { PRE_FIX } from "../../config";
import StaffItems from "./staffItem";
import CourseItems from "./courseItem";
import MoralItems from "./moralItems";
import InternshipItems from "./internshipItem";
import ResourceItems from "./resourceItem";
class Teaching extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.setMenuIndex(2);
  }
  componentDidMount() {
    if (this.props.menuItems.length <= 0) {
      this.props.fetchHomeContent();
    } else {
      if (isEmpty(this.props.teaching.staff)) {
        let url = PRE_FIX + this.props.menuItems[2].sub_category[0].url;
        this.props.fetchItems(
          url,
          REQUEST_TEACHING_STAFF,
          RECEIVE_TEACHING_STAFF
        );
      }
      if (isEmpty(this.props.teaching.course)) {
        let url = PRE_FIX + this.props.menuItems[2].sub_category[1].url;
        this.props.fetchItems(
          url,
          REQUEST_TEACHING_COURSE,
          RECEIVE_TEACHING_COURSE
        );
      }
      if (isEmpty(this.props.teaching.moral)) {
        let url = PRE_FIX + this.props.menuItems[2].sub_category[2].url;
        this.props.fetchItems(
          url,
          REQUEST_TEACHING_MORAL,
          RECEIVE_TEACHING_MORAL
        );
      }
      if (isEmpty(this.props.teaching.internship)) {
        let url = PRE_FIX + this.props.menuItems[2].sub_category[3].url;
        this.props.fetchItems(
          url,
          REQUEST_TEACHING_INTERNSHIP,
          RECEIVE_TEACHING_INTERNSHIP
        );
      }
      if (isEmpty(this.props.teaching.resource)) {
        let url = PRE_FIX + this.props.menuItems[2].sub_category[4].url;
        this.props.fetchItems(
          url,
          REQUEST_TEACHING_RESOURCE,
          RECEIVE_TEACHING_RESOURCE
        );
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.teaching.isStaffFetching ||
      nextProps.teaching.isCourseFetching ||
      nextProps.teaching.isMoralFetching ||
      nextProps.teaching.isIntershipFetching ||
      nextProps.teaching.isResourceFetching
    ) {
      return;
    }
    //console.log("next props: ", nextProps);
    let menuLength = nextProps.menuItems.length;

    if (menuLength > 0 && isEmpty(nextProps.teaching.staff)) {
      let url = PRE_FIX + nextProps.menuItems[2].sub_category[0].url;
      this.props.fetchItems(
        url,
        REQUEST_TEACHING_STAFF,
        RECEIVE_TEACHING_STAFF
      );
    }
    if (menuLength > 0 && isEmpty(this.props.teaching.course)) {
      let url = PRE_FIX + nextProps.menuItems[2].sub_category[1].url;
      this.props.fetchItems(
        url,
        REQUEST_TEACHING_COURSE,
        RECEIVE_TEACHING_COURSE
      );
    }
    if (menuLength > 0 && isEmpty(this.props.teaching.moral)) {
      let url = PRE_FIX + nextProps.menuItems[2].sub_category[2].url;
      this.props.fetchItems(
        url,
        REQUEST_TEACHING_MORAL,
        RECEIVE_TEACHING_MORAL
      );
    }
    if (menuLength > 0 && isEmpty(this.props.teaching.internship)) {
      let url = PRE_FIX + nextProps.menuItems[2].sub_category[3].url;
      this.props.fetchItems(
        url,
        REQUEST_TEACHING_INTERNSHIP,
        RECEIVE_TEACHING_INTERNSHIP
      );
    }
    if (menuLength > 0 && isEmpty(this.props.teaching.resource)) {
      let url = PRE_FIX + nextProps.menuItems[2].sub_category[4].url;
      this.props.fetchItems(
        url,
        REQUEST_TEACHING_RESOURCE,
        RECEIVE_TEACHING_RESOURCE
      );
    }
  }
  render() {
    const { staff, course, moral, internship, resource } = this.props.teaching;

    let staffItems,
      courseItems,
      moralItems,
      internshipItems,
      resourceItems,
      menuItems;
    if (!isEmpty(staff)) {
      staffItems = <StaffItems staff={staff} />;
    }
    if (!isEmpty(course)) {
      courseItems = <CourseItems course={course} />;
    }
    if (!isEmpty(moral)) {
      moralItems = <MoralItems moral={moral} />;
    }
    if (!isEmpty(internship)) {
      internshipItems = <InternshipItems internship={internship} />;
    }
    if (!isEmpty(resource)) {
      resourceItems = <ResourceItems resource={resource} />;
    }
    if (this.props.menuItems.length > 0) {
      let links = ["#staff", "#course", "#moral", "#internship", "#resource"];
      menuItems = this.props.menuItems[2].sub_category.map((item, index) => {
        return (
          <div className="profile-menu-item" key={index}>
            <a href={links[index]}>{item.title}</a>
          </div>
        );
      });
    }
    return (
      <div>
        <div className="menu clearfix">{menuItems}</div>

        {staffItems}
        {courseItems}
        {moralItems}
        {internshipItems}
        {resourceItems}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    menuItems: state.homeReducer.menuItems,
    teaching: state.teachingReducer
  };
}

export default connect(mapStateToProps, {
  fetchHomeContent,
  fetchItems,
  setMenuIndex
})(Teaching);
