import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import { Row, Col, Loading, Spacer, Avatar, Grid } from "@nextui-org/react";
import VideoPlayer from "../VideoPlayer";
import "./videoPlayerContainer.css";
import { getUserVideos } from "../../Queries/UserQueries";
import { AtomicVideoCards, MediaCard } from "../Cards";

export function VideoPlayerContainer(props) {
  const { videoID, setState } = props;
  const [contentObject, setContentObject] = useState();
  const [ownerVideos, setOwnerVideos] = useState([]);
  const [arcademyVideos, setArcademyVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getArcademyVideos(id) {
    let authorObject = Authors[id];
    let authorVideos;
    console.log("id", id);
    if (authorObject !== undefined) {
      authorVideos = authorObject.createdVideosByID
        .map((x) => Videos[x])
        .filter((x) => x.uid !== videoID);
    }
    console.log(authorVideos, "authorVideos");
    return [authorVideos, authorObject];
  }

  useEffect(() => {
    let videoObject = Videos[props.videoID];
    let authorObject = Authors[videoObject.authorID];
    // let authorVideos = authorObject.createdVideosByID
    //   .map((x) => Videos[x])
    //   .filter((x) => x.uid !== videoID);
    let assetDetails = {
      //authorVideos,
      videoID,
      videoObject,
      authorObject,
      src: videoObject.videoSrc,
    };
    async function getData() {
      let ownerVideos = await getUserVideos(authorObject.uid, "video", "");
      let authorVideos = getArcademyVideos(authorObject.uid);
      let filteredOwnerVideos = ownerVideos[0].filter((x) => x.id !== videoID);

      if (authorVideos[0] !== undefined) {
        setArcademyVideos(authorVideos[0]);
        //setAuthorObject(authorVideos[1]);
      }
      setContentObject(assetDetails);
      setOwnerVideos(filteredOwnerVideos);
      setIsLoading(false);
    }
    getData();
  }, [props]);

  let cards = arcademyVideos.map((video, index) => {
    console.log(video, "arcademyVideos");
    return (
      <div className="videoThumbnails" key={index}>
        <Link
          key={video.uid}
          to={`/playground/${video.uid}`}
          className="textNoDec"
          onClick={setState}
        >
          <MediaCard video={video} setState={setState} />
        </Link>
      </div>
    );
  });

  let atomicCards = ownerVideos.map((video, index) => {
    console.log(ownerVideos, "ownerVideos");
    return (
      <div className="videoThumbnails" key={index}>
        <Link
          key={video.uid}
          to={`/AtomicPlayground/${video.id}`}
          className="textNoDec"
          onClick={setState}
        >
          <AtomicVideoCards video={video} />
        </Link>
      </div>
    );
  });

  return (
    <>
      <div className="video-player-container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <header className="video-header">
              <h3 className="video-title">
                {contentObject.videoObject.videoTitle}
              </h3>
            </header>

            {console.log(
              contentObject.videoObject.videoLocation,
              "contentObject.videoLocation"
            )}
            {contentObject.videoObject?.videoLocation === "Arweave" ? (
              <div className="video-player">
                <video
                  className="react-player"
                  controls={true}
                  width="100%"
                  height="100%"
                >
                  <source
                    src={contentObject.videoObject.videoSrc}
                    type="video/mp4"
                  />
                </video>
              </div>
            ) : (
              <VideoPlayer src={contentObject.videoObject.videoSrc} />
            )}
            <footer className="video-footer">
              <Row display="flex" justify="flex-start" align="center">
                <Link
                  to={`/profile/${contentObject.authorObject.addr}/${contentObject.authorObject.uid}`}
                >
                  <Avatar
                    src={contentObject.authorObject.avatar}
                    size="lg"
                    pointer="true"
                  />
                </Link>

                <Col>
                  <p className="pText">
                    {contentObject.videoObject.description}
                  </p>
                </Col>
              </Row>

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
                    <p className="pText">
                      {contentObject.authorObject.username}
                    </p>
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
              {/* <div className="contentScrollContainer">
                <div className="hs">
                  {atomicCards}
                  {cards}
                </div>
              </div> */}

              <div className="contentScrollContainer">
                <div className="hs">
                  {atomicCards}
                  {cards}
                </div>
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
}

export default VideoPlayerContainer;
