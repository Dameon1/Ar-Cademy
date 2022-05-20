import React, { useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

//   Takes in string of video url and returns a plyr object
export function VideoPlayer(props) {
  const ref = useRef()

  let videoSrc = {
    type: "video",
    sources: [{ src: props.contentObject.src, }]
  };
  let videoSrcYT = {
    type: "video",
    sources: [{ src: props.contentObject.src, provider: "youtube" }]
  };
  console.log(props.contentObject)
  if (props.contentObject.src.length < 15) {
    videoSrc = videoSrcYT
  };

  if (!props.isLoading) {
    return (
      <div >
        <Plyr ref={ref} source={videoSrc || ""} />
      </div>
    );
  }
  return null;
}
export default VideoPlayer;

