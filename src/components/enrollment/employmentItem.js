import React from "react";
import { createContentMarkup } from "../../common";
const EmploymentItems = props => {
  return (
    <div id="employment" className="recruit-item">
      <h3>
        {props.employment.cate_title}
        <a href="#menuTag" className="return-link">
          返回上級<i className="fa fa-angle-double-up"></i>
        </a>
      </h3>
      <div
        dangerouslySetInnerHTML={createContentMarkup(
          props.employment.rows.content
        )}
      />
    </div>
  );
};
export default EmploymentItems;
