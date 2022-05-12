import React, { useState, useEffect } from "react";
import { Authors } from '../../Authors'
import { Videos } from '../../Videos';
import VideoPlayer from "../VideoPlayer";
import './videoPlayerContainer.css';

export function VideoPlayerContainer() {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false)
  }, []);

  let videoID = new URL(window.location.href).pathname.split('/').at(-1);
  let video = Videos[videoID];
  let author = Authors[video.authorID];
  let src = video.videoSrc;

  if (!isLoading) {
    return (
      <div className="video-player-container">
        <header className="video-header">
          <h2 className="video-title">{video.videoTitle}</h2>
        </header>

        <div className="video-player">
          <VideoPlayer src={src} />
        </div>

        <footer className="video-footer">
          <h2>To learn more about {author.author}</h2>


          <a href={author.authorLink} target="_blank"
            rel="noreferrer" >
            <p className='video-creator-link'>{author.username}</p>
          </a>

          <p>About Creator :</p>
          <a href={author.authorWebsite}
            className="video-creator-link"
            target="_blank"
            rel="noreferrer"
          >
            <p>{video.description}</p>
          </a>
        </footer>

      </div>
    );
  }
  return null;
}
export default VideoPlayerContainer;

