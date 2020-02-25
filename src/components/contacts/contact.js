import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeContent } from "../../actions/homeAction";
import { fetchItems } from "../../actions/action";
import { isEmpty } from "../../common";
import { setMenuIndex } from "../../actions/setActiveMenuAction";
import {
  REQUEST_CONTACT,
  RECEIVE_CONTACT,
  REQUEST_CONTACT_OPENDAY,
  RECEIVE_CONTACT_OPENDAY,
  REQUEST_CONTACT_SPONSOR,
  RECEIVE_CONTACT_SPONSOR
} from "../../actions/types";
import { PRE_FIX } from "../../config";
import ContactItems from "./contactItem";
class Contact extends Component {
  constructor(props) {
    super(props);
    this.windowWidth = window.innerWidth * 0.9;
  }
  componentWillMount() {
    this.props.setMenuIndex(6);
  }
  componentDidMount() {
    //console.log("prop: ", this.props);
    if (this.props.menuItems.length <= 0) {
      this.props.fetchHomeContent();
    } else {
      if (isEmpty(this.props.contact.contact)) {
        let url = PRE_FIX + this.props.menuItems[6].sub_category[0].url;

        this.props.fetchItems(url, REQUEST_CONTACT, RECEIVE_CONTACT);
      }
      if (isEmpty(this.props.contact.openday)) {
        let url = PRE_FIX + this.props.menuItems[6].sub_category[1].url;
        this.props.fetchItems(
          url,
          REQUEST_CONTACT_OPENDAY,
          RECEIVE_CONTACT_OPENDAY
        );
      }
      if (isEmpty(this.props.contact.sponsor)) {
        let url = PRE_FIX + this.props.menuItems[6].sub_category[2].url;
        this.props.fetchItems(
          url,
          REQUEST_CONTACT_SPONSOR,
          RECEIVE_CONTACT_SPONSOR
        );
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.contact.isContactFetching ||
      nextProps.contact.isOpendayFetching ||
      nextProps.contact.isSponsorFetching
    ) {
      return;
    }
    //console.log("next props: ", nextProps);
    let menuLength = nextProps.menuItems.length;

    if (menuLength > 0 && isEmpty(nextProps.contact.contact)) {
      let url = PRE_FIX + nextProps.menuItems[6].sub_category[0].url;
      this.props.fetchItems(url, REQUEST_CONTACT, RECEIVE_CONTACT);
    }
    if (menuLength > 0 && isEmpty(this.props.contact.openday)) {
      let url = PRE_FIX + nextProps.menuItems[6].sub_category[1].url;
      this.props.fetchItems(
        url,
        REQUEST_CONTACT_OPENDAY,
        RECEIVE_CONTACT_OPENDAY
      );
    }
    if (menuLength > 0 && isEmpty(this.props.contact.sponsor)) {
      let url = PRE_FIX + nextProps.menuItems[6].sub_category[2].url;
      this.props.fetchItems(
        url,
        REQUEST_CONTACT_SPONSOR,
        RECEIVE_CONTACT_SPONSOR
      );
    }
  }
  render() {
    const { contact, openday, sponsor } = this.props.contact;
    let contactItem, opendayItem, sponsorItem, menuItems;
    //console.log(this.props);
    if (!isEmpty(contact)) {
      contactItem = <ContactItems item={contact.rows} id="contact" />;
    }
    if (!isEmpty(openday)) {
      opendayItem = <ContactItems item={openday.rows} id="openday" />;
    }
    if (!isEmpty(sponsor)) {
      sponsorItem = <ContactItems item={sponsor.rows} id="sponsor" />;
    }
    if (this.props.menuItems.length > 0) {
      let links = ["#contact", "#openday", "#sponsor"];
      menuItems = this.props.menuItems[6].sub_category.map((item, index) => {
        let width = parseInt(
          this.windowWidth / this.props.menuItems[6].sub_category.length
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
        <div className="menu clearfix">{menuItems}</div>
        {contactItem}
        {opendayItem}
        {sponsorItem}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    menuItems: state.homeReducer.menuItems,
    contact: state.contactReducer
  };
}

export default connect(mapStateToProps, {
  fetchHomeContent,
  fetchItems,
  setMenuIndex
})(Contact);
