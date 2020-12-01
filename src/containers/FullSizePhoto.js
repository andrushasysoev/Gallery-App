import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { likePhoto, unlikePhoto } from "../actions";
import { unsplashLikePhoto, unsplashUnlikePhoto } from "../unsplash";

import getFormattedDate from "../utils";

import liked from "../assets/001-like.png";
import unliked from "../assets/002-heart.png";
import close from "../assets/003-left-arrow.png";

class FullSizePhoto extends React.Component {
  constructor(props) {
    super(props);

    const id = location.pathname.split("photos/")[1];
    let photo = {};

    props.photos.forEach((element) => {
      if (element.id === id) {
        photo = element;
      }
    });

    this.state = { photo };
  }

  componentDidMount() {
    document.body.style.overflowY = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflowY = "auto";
  }

  toggleLike() {
    const token = localStorage.getItem("token");
    const id = this.state.photo.id;

    if (this.state.photo.liked_by_user) {
      unsplashUnlikePhoto(id, token);
      this.props.unlikePhoto(id);
    } else {
      unsplashLikePhoto(id, token);
      this.props.likePhoto(id);
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

    const id = this.state.photo.id;
    const url = this.state.photo.links.html;
    const autor = this.state.photo.user.name;
    const image = this.state.photo.urls.small;
    const isLiked = this.state.photo.liked_by_user;
    const likesCount = this.state.photo.likes;
    const date = getFormattedDate(this.state.photo.updated_at);

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
    photos: state.map((photo, i) => {
      photo.number = i;
      return photo;
    }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    likePhoto: (id) => dispatch(likePhoto(id)),
    unlikePhoto: (id) => dispatch(unlikePhoto(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FullSizePhoto);