import React, { useState, useEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

//   Takes in string of video url and returns a plyr object
export function VideoPlayer (props){
    const [isLoading, setIsLoading] = useState(true);
    const ref = useRef()
    
    useEffect(() => {
    setIsLoading(false)
    }, [])

    let videoSrc = {
      type: "video",
      sources: [ { src: props.src,  }]
    };
   
    let videoSrcYT = {
      type: "video",
      sources: [{ src: props.src, provider: "youtube" }]
    };

    if (props.src.length < 15) {
      videoSrc = videoSrcYT
    };  
    
    if (!isLoading) {
      return (
        <div >
            <Plyr ref={ref} source={videoSrc} />
        </div>
      );
    }
    return null;
  }
  export default VideoPlayer;

