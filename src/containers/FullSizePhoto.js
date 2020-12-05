import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getPhoto, likePhoto, unlikePhoto } from "../actions";
import {
  unsplashLikePhoto,
  unsplashUnlikePhoto,
  unsplashGetPhoto,
} from "../unsplash";

import getFormattedDate from "../utils";

import liked from "../assets/001-like.png";
import unliked from "../assets/002-heart.png";
import close from "../assets/003-left-arrow.png";

class FullSizePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.getPhoto = this.getPhoto.bind(this);

    const id = location.pathname.split("photos/")[1];
    this.getPhoto(id);
  }

  componentDidMount() {
    document.body.style.overflowY = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflowY = "auto";
  }

  getPhoto(id) {
    if (this.props.photos.length > 0) {
      this.props.photos.forEach((photo) => {
        if (photo.id === id) {
          this.props.getPhoto(photo);
        }
      });
    } else {
      unsplashGetPhoto(id, localStorage.getItem("token")).then((photo) => {
        this.props.getPhoto(photo);
      });
    }
  }

  toggleLike() {
    const token = localStorage.getItem("token");
    const id = this.props.photo.id;

    if (this.props.photo.liked_by_user) {
      unsplashUnlikePhoto(id, token).then((json) =>
        this.props.unlikePhoto(json.photo)
      );
    } else {
      unsplashLikePhoto(id, token).then((json) =>
        this.props.likePhoto(json.photo)
      );
    }
  }

  render() {
    const bgImages = {
      liked: {
        backgroundImage: "url(" + liked + ")",
      },
      unliked: {
        backgroundImage: "url(" + unliked + ")",
      },
      close: {
        backgroundImage: "url(" + close + ")",
      },
    };

    const id = this.props.photo.id;
    const url = this.props.photo.links.html;
    const autor = this.props.photo.user.name;
    const image = this.props.photo.urls.small;
    const isLiked = this.props.photo.liked_by_user;
    const likesCount = this.props.photo.likes;
    const date = getFormattedDate(this.props.photo.updated_at);

    return (
      <div className="overlay-modal">
        <Link to="/photos" className="overlay-link"></Link>
        <article className="full-photo">
          <Link to="/photos">
            <button
              className="full-photo__close-button"
              style={bgImages.close}
            />
          </Link>

          <h2 className="full-photo__heading">
            <a href={url}>{autor}</a>
          </h2>

          <img className="full-photo__image" src={image} />

          <button
            className="full-photo__like-button"
            style={isLiked ? bgImages.liked : bgImages.unliked}
            onClick={this.toggleLike.bind(this)}
          ></button>

          <p className="full-photo__likes-count">Нравится: {likesCount}</p>

          <time className="full-photo__time">{date}</time>
        </article>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    photos: state.photos,
    photo: state.currentPhoto,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPhoto: (photo) => dispatch(getPhoto(photo)),
    likePhoto: (id) => dispatch(likePhoto(id)),
    unlikePhoto: (id) => dispatch(unlikePhoto(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FullSizePhoto);