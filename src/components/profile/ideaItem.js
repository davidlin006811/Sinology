import React from "react";
import { createContentMarkup } from "../../common";
const IdeaItems = props => {
  return (
    <div id="idea">
      <h3>
        {props.idea.cate_title}
        <a href="#menuTag" className="return-link">
          返回上級<i className="fa fa-angle-double-up"></i>
        </a>
      </h3>

      {props.idea.rows.map(item => (
        <div key={item.id}>
          <h4>{item.title} </h4>
          <div dangerouslySetInnerHTML={createContentMarkup(item.content)} />
        </div>
      ))}
    </div>
  );
};
export default IdeaItems;
