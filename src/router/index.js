import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";
import Banner from "../components/banner";
import Navigation from "../components/menu";
/*export default () => {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  );
};*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        {
          cate_id: 1,
          title: "首頁",
          url: "/"
        },
        {
          cate_id: 2,
          title: "學院概況",
          url: "/collegeprofile"
        },
        {
          cate_id: 3,
          title: "學院教學",
          url: "/teaching"
        },
        {
          cate_id: 4,
          title: "學院生活",
          url: "/life"
        },
        {
          cate_id: 5,
          title: "招生就業",
          url: "/enrolment"
        },
        {
          cate_id: 6,
          title: "學院新聞",
          url: "/news"
        },
        {
          cate_id: 7,
          title: "對外訊息",
          url: "/contact"
        }
      ]
    };
  }
  render() {
    // console.log("index props: ", this.props);
    return (
      <Router>
        <div>
          <Banner />
          <Navigation list={this.state.menuItems} />
          <Routes />
        </div>
      </Router>
    );
  }
}
export default App;
