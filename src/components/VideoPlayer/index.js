import React, { useState, useEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

//   Takes in string of video url and returns a plyr object
export function VideoPlayer (props){
    const [isLoading, setIsLoading] = useState(true);
    const [src, setSrc] = useState('');
    useEffect(() => {
      setIsLoading(false)
    }, [])
  
    const ref = useRef()

    //let x = props.src;
    console.log(src, 'source');
    let source=[{ src: props.src, provider: "youtube" }];
    let sources = [{ src: props.src, provider: "youtube" }]
    if (props.src.length < 15) {
      source = sources
    }

    
    let videoSrc = {
      type: "video",
      sources: source
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

