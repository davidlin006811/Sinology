import React from "react";
import { createContentMarkup } from "../../common";

const MoralItems = props => {
  let courseList = props.moral.rows.map(item => {
    let id = "moral" + item.id;
    return (
      <div className="moral-course-item" id={id} key={id}>
        <h4>
          {item.title}
          <a href="#moral" className="return-link">
            返回上級<i className="fa fa-angle-double-up"></i>
          </a>
        </h4>
        <div dangerouslySetInnerHTML={createContentMarkup(item.content)} />
      </div>
    );
  });
  let menuList = props.moral.sub_category.map(item => {
    let link = "#moral" + item.id;
    return (
      <div className="moral-menu-item" key={item.id}>
        <a href={link}>{item.title}</a>
      </div>
    );
  });
  return (
    <div id="moral" className="clearDiff">
      <h3>
        {props.moral.cate_title}
        <a href="#menuTag" className="return-link">
          返回上級<i className="fa fa-angle-double-up"></i>
        </a>
      </h3>
      <div className="clearfix">{menuList}</div>
      {courseList}
    </div>
  );
};
export default MoralItems;
