import React, { Component } from "react";
import Video from "../video/video";
import PhotoList from "../photo/photoList";
const HomeItems = props => {
  const { cate_title, newlist, photolist, videolist } = props.homeInfo;
  const videoList = videolist.rows.map(item => {
    /*return (
      <div key={item.id} className="video-item">
        <h5>{item.title}</h5>
        <video poster={item.cover} controls>
          <source src={item.video_url} type="video/mp4" />
        </video>
      </div>
    );*/
    return (
      <div key={item.id} className="video-item">
        <h5>{item.title}</h5>
        <Video video={item} />
      </div>
    );
  });
  let index = photolist.rows[0].title.indexOf("-");
  let title = photolist.rows[0].title.slice(0, index);

  const photoList = (
    <PhotoList photolist={photolist} title={title} id="homePhoto" />
  );

  return (
    <div style={{ overflow: "scroll" }}>
      {videoList}
      {photoList}
    </div>
  );
};
export default HomeItems;
