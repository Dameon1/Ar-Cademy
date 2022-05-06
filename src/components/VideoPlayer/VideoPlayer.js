import React from "react";
import ReactPlayer from 'react-player'
import { Creators } from '../../Creators'

export default class VideoPlayer extends React.Component {

  render() {

    let creator = Creators[this.props.dev];
    console.log(creator)
    if (!this.props.loading) {
      return (
        <div className="video-player-container">
          <header className="video-header">
            <h2 className="video-title">{creator.videoHeading}</h2>
          </header>
          <div className="video-player">
            <ReactPlayer
              controls={true}
              width="100%"
              url={this.props.src} />
          </div>

          <footer className="video-footer">
            <h2>To learn more about {creator.author}</h2>
            <p> Visit their website: <a href={creator.website}>{creator.website}</a></p>
            <p>Video Creator :
              <a
                className="video-creator-link"
                href={creator.creatorLink}
                target="_blank"
                rel="noreferrer"
              >
                {creator.username} </a>
            </p>
          </footer>
        </div>
      );
    }
    return null;
  }
}

