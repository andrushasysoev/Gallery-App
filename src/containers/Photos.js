import React from "react";
import { connect } from "react-redux";

import { loadPhotos } from "../actions";
import { userAccessToken, unsplashLoadPhotos } from "../unsplash";

import PhotoPreview from "../components/PhotoPreview";

import logo from "../img/logo.png";

let itemsLoaded = false;

class Photos extends React.Component {
  constructor() {
    super();
    this.loadPhotos = this.loadPhotos.bind(this);
    this.getFormattedDate = this.getFormattedDate.bind(this);

    if (!localStorage.getItem("token")) {
      userAccessToken(location.search.split("code=")[1]);
    }
  }

  componentDidMount() {
    if (!itemsLoaded) {
      this.loadPhotos();
      itemsLoaded = true;
    }
  }

  loadPhotos() {
    let page = localStorage.getItem("page");

    unsplashLoadPhotos(page, localStorage.getItem("token"))
      .then((photos) => {
        this.props.loadPhotos(photos);
      })
      .then(() => {
        localStorage.setItem("page", +page + 1);
      });
  }

  getFormattedDate(UTCvalue) {
    const date = new Date(UTCvalue);
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    return (
      date.getDate() +
      " " +
      months[date.getMonth()] +
      " " +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes())
    );
  }

  render() {
    return (
      <div className="photos-screen">
        <header>
          <div className="fixed-container clearfix">
            <div className="logo">
              <img src={logo} />

              <div className="user-data">Lyudmila Minakova</div>
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
                  date={this.getFormattedDate(photo.updated_at)}
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

function mapStateToProps(state) {
  return {
    photos: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPhotos: (photos) => dispatch(loadPhotos(photos)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
