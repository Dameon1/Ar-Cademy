import React, { useState, useEffect, useContext, useRef } from "react";
import { Creators } from '../../Creators'
// import { ReactVideo } from "reactjs-media";

export function VideoPlayer (props){
  let topic = new URL(window.location.href).pathname.split('/').at(-1);
    let creator = Creators[props.topic];

    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(false)
    }, [])
    console.log(topic, 'props');
  
    const ref = useRef()
  
    
  
   
  
  
    const videoSrc = {
      type: "video",
      sources: [
        {
          src: "https://us.glassapi.xyz/1647306621.NfBRvNpXJ38Mc_h42c9Zehmc8i34iVWiNu5Vu1_IC0Q.ac925d47-4a07-4c84-859b-9924f84708b9_uploaded_video_1_1_audio.mp4",
        }
      ]
    };

    
    if (!isLoading) {
      return (
        <div className="video-player-container">
          <header className="video-header">
            {/* <h2 className="video-title">{creator.videoHeading}</h2> */}
          </header>
          <div className="video-player">
          <Plyr ref={ref} source={videoSrc} />
            {/* <Player
              controls={true}
              width="100%"
              url={props.src} /> */}
               {/* <ReactVideo
            src='https://www.example.com/myvideo.mp4'
            poster='/poster.png'
            primaryColor="red"
            autoPlay
        /> */}
          </div>

          <footer className="video-footer">
            {/* <h2>To learn more about {creator.author}</h2>
            <p> Visit their website: <a href={creator.website}>{creator.website}</a></p> */}
            <p>Video Creator :
              <a
                className="video-creator-link"
                // href={creator.creatorLink}
                href='/'
                target="_blank"
                rel="noreferrer"
              >
                {creator.description} </a>
            </p>
          </footer>
        </div>
      );
    }
    return null;
  }
  export default VideoPlayer;

