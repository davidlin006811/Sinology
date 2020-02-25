import React from "react";
import PhotoList from "../photo/photoList";
const SceneryItems = props => {
  //console.log("scenery props: ", props);
  return (
    <div id="scenery">
      <h3>{props.scenery.cate_title}</h3>
      <PhotoList photolist={props.scenery} title={props.scenery.cate_title} />
    </div>
  );
};
export default SceneryItems;
