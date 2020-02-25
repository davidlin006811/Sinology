import React, { Component } from "react";
import axios from "axios";
import { createContentMarkup } from "../../common";
class RecruitItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  fetchData = (url, id) => {
    //console.log("url: ", url);
    axios.get(url).then(res => {
      let data = { ...res.data.data };
      let items = this.state.data;
      items.push(data);
      this.setState({
        data: items
      });
      sessionStorage.setItem("recruit" + id, JSON.stringify(res.data.data));
    });
  };
  componentDidMount() {
    //console.log(this.props);
    for (let i = 0; i < this.props.recruit.sub_category.length; i++) {
      let item = this.props.recruit.sub_category[i];
      // console.log("item: ", item);
      let items = this.state.data;
      let data = sessionStorage.getItem("recruit" + item.id);

      if (data !== null) {
        let item = JSON.parse(data);
        let recruit = { ...item };
        items.push(recruit);
        this.setState({
          data: items
        });
      } else {
        this.fetchData(item.url, item.id);
      }
    }
  }
  render() {
    //console.log(this.props);
    // console.log(this.state);
    const recruitList = this.state.data.map((item, index) => {
      // console.log("recruit item: ", item);
      let id = "recruit" + item.rows.id;
      return (
        <div id={id} className="recruit-item" key={id}>
          <h4>
            {item.rows.title}
            <a href="#recruit" className="return-link">
              返回上級<i className="fa fa-angle-double-up"></i>
            </a>
          </h4>
          <div
            dangerouslySetInnerHTML={createContentMarkup(item.rows.content)}
          />
        </div>
      );
    });
    let menuList;
    if (this.state.data.length === this.props.recruit.sub_category.length) {
      let dataList = this.state.data;

      menuList = this.props.recruit.sub_category.map((item, index) => {
        //  console.log("item: ", item);

        let link = "#recruit" + dataList[index].rows.id;

        return (
          <div className="profile-menu-item" key={index}>
            <a href={link}>{item.title}</a>
          </div>
        );
      });
    }

    return (
      <div id="recruit" className="clearDiff">
        <h3>{this.props.recruit.cate_title}</h3>
        <div className="clearfix">{menuList}</div>

        {recruitList}
      </div>
    );
  }
}
export default RecruitItems;
