import React from "react";
import { createContentMarkup } from "../../common";

const NewsItems = props => {
  return (
    <div id={props.id} className="clearDiff">
      <h4>{props.item.title}</h4>
      <div dangerouslySetInnerHTML={createContentMarkup(props.item.content)} />
    </div>
  );
};
export default NewsItems;
