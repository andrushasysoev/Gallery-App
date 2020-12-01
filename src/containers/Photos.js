import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import { loadPhotos, getUserName } from "../actions";
import {
  userAccessToken,
  unsplashLoadPhotos,
  unsplashGetUser,
} from "../unsplash";

import getFormattedDate from "../utils";

import PhotoPreview from "../containers/PhotoPreview";

import logo from "../assets/logo.png";

let itemsWereLoaded = false;
let usernameIsAvailable = false;

class Photos extends React.Component {
  constructor() {
    super();
    this.loadPhotos = this.loadPhotos.bind(this);

    if (!localStorage.getItem("token")) {
      userAccessToken(location.search.split("code=")[1]);
    }
  }

  componentDidMount() {
    if (!itemsWereLoaded) {
      this.loadPhotos();
      itemsWereLoaded = true;
    }
  }

  loadPhotos() {
    let page = localStorage.getItem("page");
    const scrollPosition = window.pageYOffset;

    unsplashLoadPhotos(page, localStorage.getItem("token"))
      .then((photos) => {
        this.props.loadPhotos(photos);
      })
      .then(() => {
        localStorage.setItem("page", +page + 1);
        window.scrollTo({ top: scrollPosition });
        if (!usernameIsAvailable) {
          this.getUserName();
          usernameIsAvailable = true;
        }
      });
  }

  getUserName() {
    unsplashGetUser().then((user) => {
      this.props.getUserName(user.username);
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="fixed-container clearfix">
            <div className="logo">
              <img src={logo} className="logo__image" />

              <div className="logo__user-data">Lyudmila Minakova</div>
            </div>
          </div>
        </header>

        <main className="fixed-container">
          <ul className="photo-gallery__list">
            {this.props.photos.map((photo, i) => {
              return (
                <PhotoPreview
                  key={i}
                  id={photo.id}
                  autor={photo.user.name}
                  url={photo.user.links.html}
                  image={photo.urls.thumb}
                  likesCount={photo.likes}
                  date={getFormattedDate(photo.updated_at)}
                />
              );
            })}
          </ul>

          <button
            className="show-more-button"
            onClick={(e) => {
              this.loadPhotos();
            }}
          >
            Show More
          </button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (photos) => ({ photos });

function mapDispatchToProps(dispatch) {
  return {
    loadPhotos: (photos) => dispatch(loadPhotos(photos)),
    getUserName: (photos) => dispatch(getUserName(photos)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);