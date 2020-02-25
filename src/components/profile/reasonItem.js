import React from "react";
import { createContentMarkup } from "../../common";
const ReasonItems = props => {
  return (
    <div id="reason">
      <h3>
        {props.reason.cate_title}{" "}
        <a href="#menuTag" className="return-link">
          返回上級<i className="fa fa-angle-double-up"></i>
        </a>
      </h3>

      <div
        dangerouslySetInnerHTML={createContentMarkup(props.reason.rows.content)}
      />
    </div>
  );
};
export default ReasonItems;
