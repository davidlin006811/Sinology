import React, { Component } from "react";
import Photo from "./photo";

class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhoto: false
    };
  }
  showPhoto = () => {
    this.setState({
      showPhoto: true
    });
  };
  hidePhoto = () => {
    this.setState({
      showPhoto: false
    });
  };
  render() {
    let photo, photoList;
    if (this.state.showPhoto) {
      photo = (
        <Photo
          items={this.props.photolist.rows}
          title={this.props.title}
          hidePhoto={this.hidePhoto}
        />
      );
    }
    photoList = (
      <div onClick={this.showPhoto} className="photo-abbr">
        <h4>{this.props.title}</h4>

        <div className="img">
          <img src={this.props.photolist.rows[0].cover} alt="photo" />
          <div className="photo-qty">{this.props.photolist.rows.length}張</div>
        </div>
      </div>
    );
    return (
      <div>
        {photoList}
        {photo}
      </div>
    );
  }
}
export default PhotoList;
