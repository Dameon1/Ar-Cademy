import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import { Card, MediaCards } from "../Cards";
import {
  Grid,
  Row,
  Text,
  Col,
  Loading,
  Container,
  Button,
} from "@nextui-org/react";
import fallbackImage from "../../favicon.ico";
import VideoPlayer from "../VideoPlayer";
import "./videoPlayerContainer.css";

export function VideoPlayerContainer() {
  const [contentObject, setContentObject] = useState(null);

  function getContentInfo() {
    let videoId = new URL(window.location.href).pathname.split("/").at(-1);
    let videoObject = Videos[videoId];
    let authorObject = Authors[videoObject.authorID];
    let authorVideos = authorObject.createdVideosByID
      .map((x) => Videos[x])
      .filter((x) => x.uid !== videoId);
    console.log(authorVideos);
    let contentObject = {
      authorVideos,
      videoId,
      videoObject,
      authorObject,
      src: videoObject.videoSrc,
    };
    return contentObject;
  }

  useEffect(() => {
    const response = getContentInfo();
    setContentObject(response);
  }, []);

  if (contentObject) {
    console.log(contentObject);
    let cards = contentObject.authorVideos.map((content) => {
      return (
        <div>
          <Link
            key={content.uid}
            to={`/playground/${content.uid}`}
            className="cardLinks"
          >
            <p>1</p>

            <MediaCards content={content} />
          </Link>
        </div>
      );
    });

    return (
      <div className="video-player-container">
        <header className="video-header">
          <p className="video-title">{contentObject.videoObject.videoTitle}</p>
        </header>

        <VideoPlayer src={contentObject.src} />

        <footer className="video-footer">
          <p>{contentObject.videoObject.description}</p>
          <p>About Creator :</p>
          <Row justify="center" align="space-evenly">
            <Col>
              <a
                href={`${contentObject.authorObject.authorWebsite}`}
                className="video-creator-link"
                target="_blank"
                rel="noreferrer"
              >
                <p>{contentObject.authorObject.authorWebsite}</p>
              </a>
            </Col>
            <Col>
              <a
                href={contentObject.authorObject.authorLink}
                target="_blank"
                rel="noreferrer"
                className="video-creator-link"
              >
                <p>{contentObject.authorObject.username}</p>
              </a>
            </Col>
            <Col>
              <Link
                to={`/profile/${contentObject.authorObject.uid}/${contentObject.authorObject.uid}`}
                className="video-creator-link"
              >
                <p>ArProfile</p>
              </Link>
            </Col>
          </Row>

          <h1>Videos</h1>
          <div className="contentScrollContainer">
            <div className="hs">{cards}</div>
          </div>

          {/* <h2>To learn more about this video, visit the author's </h2>

          <p>About Creator :</p> */}
        </footer>
      </div>
    );
  }
  return null;
}

export default VideoPlayerContainer;
