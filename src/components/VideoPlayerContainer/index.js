import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Authors } from '../../Authors'
import { Videos } from '../../Videos';
import VideoPlayer from "../VideoPlayer";
import './videoPlayerContainer.css';

export function VideoPlayerContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentObject, setContentObject] = useState([]);

  async function getContentInfo() {
    let videoId = new URL(window.location.href).pathname.split('/').at(-1);
    let videoObject = Videos[videoId];
    let authorObject = Authors[videoObject.authorID];
    let contentObject = {
      videoId: videoId,
      videoObject: videoObject,
      authorObject: authorObject,
      src: videoObject.videoSrc,
    }
    return contentObject;
  }

  useEffect(() => {
    setIsLoading(true)
    async function fetchData() {
      const response = await getContentInfo().then(content => {
        setContentObject(content);
      });
    }
    fetchData();
    setIsLoading(false);
  }, [])
  if (!isLoading) {
    return (
      <div className="video-player-container">
        <header className="video-header">
          <p className="video-title">{contentObject.videoObject.videoTitle}</p>
        </header>

        <div className="video-player">
          <VideoPlayer contentObject={contentObject} />
        </div>

        <footer className="video-footer">
          <h2>To learn more about this video, visit the author's profile:
            <Link to={`/Ar-Cademy/profile/${contentObject.authorObject.uid}`}>Here</Link></h2>


          <a href={contentObject.authorObject.authorLink} target="_blank"
            rel="noreferrer" >
            <p className='video-creator-link'>{contentObject.authorObject.username}</p>
          </a>

          <p>About Creator :</p>
          <a href={contentObject.authorObject.authorWebsite}
            className="video-creator-link"
            target="_blank"
            rel="noreferrer"
          >
            <p>{contentObject.videoObject.description}</p>
          </a>
        </footer>

      </div>)
  }
}

export default VideoPlayerContainer;

