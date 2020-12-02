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

    return (
      <li className="photo-gallery__item" key={this.props.key}>
        <article className="photo-gallery__wrapper">
          <h2 className="photo-gallery__heading">
            <a href={this.props.url}>{this.props.autor}</a>
          </h2>
          <Link to={`/photos/${this.props.id}`}>
            <img className="photo-gallery__image" src={this.props.image} />

            <div className="photo-gallery__likes-count" style={bgImageLike}>
              {this.props.likesCount}
            </div>

            <time className="photo-gallery__time">{this.props.date}</time>
          </Link>
        </article>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({ photos: state.photos });

export default connect(mapStateToProps)(PhotoPreview);