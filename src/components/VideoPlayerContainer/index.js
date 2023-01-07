import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import { MediaCards } from "../Cards";
import { Row, Col, Spacer } from "@nextui-org/react";
import VideoPlayer from "../VideoPlayer";
import "./videoPlayerContainer.css";

export function VideoPlayerContainer(props) {
  const [contentObject, setContentObject] = useState();
  const { videoID, setState } = props;

  let videoObject = Videos[props.videoID];
  let authorObject = Authors[videoObject.authorID];
  let authorVideos = authorObject.createdVideosByID
    .map((x) => Videos[x])
    .filter((x) => x.uid !== videoID);

  useEffect(() => {
    let assetDetails = {
      authorVideos,
      videoID,
      videoObject,
      authorObject,
      src: videoObject.videoSrc,
    };
    setContentObject(assetDetails);
  }, [props]);

  if (contentObject) {
    let cards = contentObject.authorVideos.map((content, index) => {
      return (
        <div className="videoThumbnails" key={index}>
          <MediaCards content={content} setState={setState} />
        </div>
      );
    });

    return (
      <div className="video-player-container">
        <header className="video-header">
          <h3 className="video-title">
            {contentObject.videoObject.videoTitle}
          </h3>
        </header>

        {console.log(videoObject.videoLocation, "contentObject.videoLocation")}
        {videoObject.videoLocation === "Arweave" ? (
          <div className="video-player">
            <video
              className="react-player"
              controls={true}
              width="100%"
              height="100%"
            >
              <source src={videoObject.videoSrc} type="video/mp4" />
            </video>
          </div>
        ) : (
          <VideoPlayer src={videoObject.videoSrc} />
        )}
        <footer className="video-footer">
          <p className="pText">{contentObject.videoObject.description}</p>
          <Spacer y={1} />
          <Row justify="center" align="space-evenly">
            <Col>
              <a
                href={`${contentObject.authorObject.authorWebsite}`}
                className="video-creator-link"
                target="_blank"
                rel="noreferrer"
              >
                <p className="pText">Website</p>
              </a>
            </Col>
            <Col>
              <a
                href={contentObject.authorObject.authorLink}
                target="_blank"
                rel="noreferrer"
                className="video-creator-link"
              >
                <p className="pText">{contentObject.authorObject.username}</p>
              </a>
            </Col>
            <Col>
              <Link
                to={`/profile/${contentObject.authorObject.addr}/${contentObject.authorObject.uid}`}
                className="video-creator-link"
              >
                <p className="pText">Profile</p>
              </Link>
            </Col>
          </Row>
          <Spacer y={1} />
          <h3>Videos</h3>
          <div className="contentScrollContainer">
            <div className="hs">{cards}</div>
          </div>
        </footer>
      </div>
    );
  }
  return null;
}

export default VideoPlayerContainer;
