import React from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

//   Takes in string of video url and returns a plyr object
export function VideoPlayer(props) {

  let videoSrc = {
    type: "video",
    sources: [{ src: props.contentObject.src, }]
  };
  let videoSrcYT = {
    type: "video",
    sources: [{ src: props.contentObject.src, provider: "youtube" }]
  };
  if (props.contentObject.src.length < 15) {
    videoSrc = videoSrcYT
  };

  return (
    <div >
      <Plyr
        type="video"
        source={videoSrc} />
    </div>
  );
}
export default VideoPlayer;

