import React from "react";
import { createContentMarkup } from "../../common";
const AlumniItems = props => {
  let contents;
  if (props.alumni.rows == null) {
    contents = (
      <div id="alumni" className="enrollment-item">
        <h3>
          {props.alumni.cate_title}
          <a href="#menuTag" className="return-link">
            返回上一級<i className="fa fa-angle-double-up"></i>
          </a>
        </h3>
        <p>網站正在建設中，該欄目暫無內容</p>
      </div>
    );
  } else {
    contents = (
      <div id="alumni">
        <h3>{props.alumni.cate_title}</h3>
        <div
          dangerouslySetInnerHTML={createContentMarkup(
            item.alumni.rows.content
          )}
        />
      </div>
    );
  }
  return contents;
};
export default AlumniItems;
