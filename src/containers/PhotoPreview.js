import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";

import like from "../assets/001-like.png";

class PhotoPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bgImageLike = {
      backgroundImage: "url(" + like + ")",
    };
    
    const { key, id, autor, url, image, likesCount, date } = this.props;

    return (
      <li className="photo-gallery__item" key={key}>
        <article className="photo-gallery__wrapper">
          <h2 className="photo-gallery__heading">
            <a href={url}>{autor}</a>
          </h2>
          <Link to={`/photos/${id}`}>
            <img className="photo-gallery__image" src={image} />

            <div className="photo-gallery__likes-count" style={bgImageLike}>
              {likesCount}
            </div>

            <time className="photo-gallery__time">{date}</time>
          </Link>
        </article>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({ photos: state.photos });

export default connect(mapStateToProps)(PhotoPreview);