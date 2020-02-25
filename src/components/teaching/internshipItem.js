import React from "react";
import Video from "../video/video";
import { PRE_FIX_COVER } from "../../config";
const InternshipItems = props => {
  //console.log("internship props: ", props);
  const items = [...props.internship.rows];

  const itemList = items.map(item => {
    let cover = PRE_FIX_COVER + item.cover;
    let video = {
      title: item.title,
      cover: cover,
      video_url: item.video_url,
      id: item.id,
      video_num: "internship_video_" + item.id
    };
    return (
      <div key={item.id}>
        <h4>{item.title}</h4>
        <Video video={video} />
      </div>
    );
  });
  return (
    <div id="internship" className="clearDiff">
      <h3>
        {props.internship.cate_title}
        <a href="#menuTag" className="return-link">
          返回上級<i className="fa fa-angle-double-up"></i>
        </a>
      </h3>
      {itemList}
    </div>
  );
};
export default InternshipItems;
