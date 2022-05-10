import React, { useState, useEffect } from "react";
import { Authors } from '../../Authors'
import { Videos } from '../../Videos';
import VideoPlayer from "../VideoPlayer";
import './videoPlayerContainer.css';
export function VideoPlayerContainer (props){
 
  let videoID = new URL(window.location.href).pathname.split('/').at(-1);
  let video = Videos[videoID];
  let author = Authors[video.authorID];
  console.log(author, "author.authorWebsite");
  const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(false)
    }, [])

    let src = video.videoSrc;
    
    if (!isLoading) {
      return (
        <div className="video-player-container">
          <header className="video-header">
            <h2 className="video-title">{video.videoTitle}</h2>
          </header>
          <div className="video-player">
            <VideoPlayer src={src}/>
          </div>

          <footer className="video-footer">
            <h2>To learn more about {author.author}</h2>
            <p className="videoLink"> Visit their page   
              <a href={author.authorWebsite} target="_blank"
                rel="noreferrer" className='video-creator-link'>
                   HERE 
              </a>
            </p>
            <p>Video Creator :
              <a href={author.authorLink}
                className="video-creator-link"
                target="_blank"
                rel="noreferrer"
              >
                {video.description}
              </a>
            </p>
          </footer>
        </div>
      );
    }
    return null;
  }
  export default VideoPlayerContainer;

