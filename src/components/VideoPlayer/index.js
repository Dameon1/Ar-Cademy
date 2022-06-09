import React from 'react';
import ReactPlayer from 'react-player'


export const VideoPlayer = (props) => {
  const { src } = props;

  return (
    <div className="video-player">
      <ReactPlayer
        preload="metadata"
        className='react-player'
        controls={true}
        width='100%'
        height='100%'
        url={src}
      />
    </div>
  );
}

export default VideoPlayer;