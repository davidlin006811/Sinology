import React, { Component } from "react";
import Video from "../video/video";
import PhotoList from "../photo/photoList";

class HomeItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayingVideoId: -1
    };
  }
  setVideoPlayId = id => {
    this.setState({
      currentPlayingVideoId: id
    });
  };
  resumeVideoPlayId = () => {
    this.setState({
      currentPlayingVideoId: -1
    });
  };
  render() {
    const { cate_title, newlist, photolist, videolist } = this.props.homeInfo;

    const videoList = videolist.rows.map(item => {
      return (
        <div key={item.id} className="video-item">
          <h5>{item.title}</h5>
          <Video
            video={item}
            playId={this.state.currentPlayingVideoId}
            setVideoPlayId={this.setVideoPlayId}
            resumeVideoPlayId={this.resumeVideoPlayId}
          />
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
  }
}
export default HomeItems;
