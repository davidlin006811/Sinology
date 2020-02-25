import React from "react";
import { createContentMarkup } from "../../common";
const listCourse = courses => {
  let courseList = courses.map((item, index) => {
    let bgColor =
      index % 2 === 0
        ? { backgroundColor: "#fff" }
        : { backgroundColor: "#f2f3f8" };
    return (
      <tr key={item.id} style={bgColor}>
        <td style={{ width: "20%" }}>{item.id} </td>
        <td style={{ width: "80%" }}>
          <p
            dangerouslySetInnerHTML={createContentMarkup(item.title)}
            style={{ paddingLeft: "10px" }}
          />
        </td>
      </tr>
    );
  });
  return (
    <table style={{ fontSize: "13px" }}>
      <thead>
        <tr
          style={{
            backgroundColor: "#057BB1",
            padding: "0 5px",
            textAlign: "center"
          }}
        >
          <td style={{ width: "20%", color: "white" }}>課程代碼</td>

          <td style={{ width: "80%", color: "white" }}>課程名稱</td>
        </tr>
      </thead>
      <tbody>{courseList}</tbody>
    </table>
  );
};
const CourseItems = props => {
  let subCategory = props.course.sub_category;

  let listItems = Object.entries(props.course.rows);
  let courseCatList = listItems.map(item => {
    let courseSection =
      item[1].data.length > 0 ? listCourse(item[1].data) : null;
    let courseId = "course" + item[0];
    return (
      <div key={item[0]} id={courseId} className="course-item">
        <h4>
          {item[1].title}
          <a href="#course" className="return-link">
            返回上級<i className="fa fa-angle-double-up"></i>
          </a>
        </h4>
        <p>{item[1].content}</p>
        {courseSection}
      </div>
    );
  });
  //let keys = Object.keys(props.course.rows);
  //console.log("keys: ", keys);
  let menuList = subCategory.map((item, index) => {
    let id = item.cate_id > 30 ? item.cate_id.toString() + "1" : item.cate_id;
    let link = "#course" + id;
    return (
      <div className="profile-menu-item" key={index}>
        <a href={link}>{item.title}</a>
      </div>
    );
  });
  return (
    <div id="course" className="clearDiff">
      <h3>
        {props.course.cate_title}
        <a href="#menuTag" className="return-link">
          返回上級<i className="fa fa-angle-double-up"></i>
        </a>
      </h3>
      {menuList}
      {courseCatList}
    </div>
  );
};
export default CourseItems;
