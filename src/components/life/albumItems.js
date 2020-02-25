import React, { Component } from "react";
import axios from "axios";
import PhotoList from "../photo/photoList";
class AlbumItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
    this.mounted = true;
  }
  fetchData = (url, id) => {
    //console.log("url: ", url);
    axios.get(url).then(res => {
      let data = { photoSet: res.data.data };
      let photos = this.state.photos;
      photos.push(data);
      if (this.mounted) {
        this.setState({
          photos: photos
        });
        sessionStorage.setItem(
          "facilities" + id,
          JSON.stringify(res.data.data)
        );
      }
    });
  };

  componentDidMount() {
    for (let i = 0; i < this.props.items.rows.length; i++) {
      let item = this.props.items.rows[i];

      let photos = this.state.photos;
      let data = sessionStorage.getItem(
        "album-" + this.props.id + "-" + item.id
      );

      if (data !== null) {
        let photo = JSON.parse(data);
        let pic = { photoSet: photo };
        photos.push(pic);
        if (this.mounted) {
          this.setState({
            photos: photos
          });
        }
      } else {
        let url = item.url.replace(new RegExp("album_id", "g"), "&album_id");
        this.fetchData(url, item.id);
      }
    }
  }
  componentWillUnmount() {
    this.mounted = null;
  }
  render() {
    //console.log("state: ", this.state);
    //console.log("props: ", this.props);
    const photos = this.state.photos;
    let items;
    if (photos.length > 0) {
      items = photos.map((item, index) => {
        return (
          <PhotoList
            photolist={item.photoSet}
            title={item.photoSet.cate_title}
            key={index}
          />
        );
      });
    }

    return (
      <div id={this.props.id} className="album-item">
        <h3>
          {this.props.items.cate_title}{" "}
          <a href="#menuTag" className="return-link">
            返回上級<i className="fa fa-angle-double-up"></i>
          </a>
        </h3>
        {items}
      </div>
    );
  }
}
export default AlbumItems;
