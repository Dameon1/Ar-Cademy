import React, { useState, useEffect } from "react";
import { Creators } from '../../Creators'
import { Videos } from '../../Videos';
import VideoPlayer from "../VideoPlayer";
import './videoPlayerContainer.css';
import { Link } from "react-router-dom";
export function VideoPlayerContainer (props){
 
  let videoID = new URL(window.location.href).pathname.split('/').at(-1);
  let video = Videos[videoID];
  console.log(video, "video");
  let author = Creators[video.authorID];
console.log(author, "author---------------------------------");
  const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(false)
    }, [])

    let src = video.videoSrc;
    console.log(src, '-------------------src');
    
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
            <p> Visit their website: <Link to={author.website}>{author.website}</Link></p>
            <p>Video Creator :
              <Link
                className="video-creator-link"
                to={author.authorLink}
                target="_blank"
                rel="noreferrer"
              >
                {video.description}
              </Link>
            </p>
          </footer>
        </div>
      );
    }
    return null;
  }
  export default VideoPlayerContainer;

