import React from "react";
//import Slider from "../slider/slider";
import { createContentMarkup } from "../../common";
const TutorItems = props => {
  return (
    <div id="tutor">
      <h3>{props.tutor.cate_title}</h3>

      <div className="introduction">
        <div
          dangerouslySetInnerHTML={createContentMarkup(
            props.tutor.info.content
          )}
        />
      </div>
    </div>
  );
};
export default TutorItems;
