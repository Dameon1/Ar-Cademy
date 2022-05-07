import React, { useState, useEffect } from "react";
import { Creators } from '../../Creators'
import { Videos } from '../../Videos';
import VideoPlayer from "../VideoPlayer";
import './videoPlayerContainer.css';

export function VideoPlayerContainer (props){
  let topic = new URL(window.location.href).pathname.split('/').at(-1);
  let creator = Creators[topic];


  console.log(creator, "creator");
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(false)
    }, [])

    console.log(topic, 'topic');
    let src = Creators[topic].videoSrc;
    console.log(src, '-------------------src');
    
    if (!isLoading) {
      return (
        <div className="video-player-container">
          <header className="video-header">
            <h2 className="video-title">{creator.videoHeading}</h2>
          </header>
          <div className="video-player">
            <VideoPlayer src={src}/>
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
                {creator.description}
                 </a>
            </p>
          </footer>
        </div>
      );
    }
    return null;
  }
  export default VideoPlayerContainer;

