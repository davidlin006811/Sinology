import React from "react";
import { createContentMarkup } from "../../common";
const StructItems = props => {
  return (
    <div id="struct">
      <h3>{props.struct.cate_title}</h3>
      <h4>{props.struct.rows.title}</h4>
      <div
        dangerouslySetInnerHTML={createContentMarkup(props.struct.rows.content)}
      />
    </div>
  );
};
export default StructItems;
