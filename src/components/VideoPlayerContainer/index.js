import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import {
  Row,
  Col,
  Loading,
  Spacer,
  Avatar,
  Text,
  Tooltip,
  Button,
} from "@nextui-org/react";
import VideoPlayer from "../VideoPlayer";
import "./videoPlayerContainer.css";
import { getUserVideos } from "../../Queries/UserQueries";
import { AtomicVideoCards, MediaCard } from "../Cards";
import { FcShare } from "react-icons/fc";
import { isVouched } from "../../lib/imgLib/stamp";
import { MdVerified } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";

export function VideoPlayerContainer(props) {
  const { videoID, setState } = props;
  const [contentObject, setContentObject] = useState();
  const [ownerVideos, setOwnerVideos] = useState([]);
  const [arcademyVideos, setArcademyVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vouched, setVouched] = useState(false);

  function getArcademyVideos(id) {
    let authorObject = Authors[id];
    let authorVideos;
    if (authorObject !== undefined) {
      authorVideos = authorObject.createdVideosByID
        .map((x) => Videos[x])
        .filter((x) => x.uid !== videoID);
    }
    return [authorVideos, authorObject];
  }

  useEffect(() => {
    let videoObject = Videos[props.videoID];
    let authorObject = Authors[videoObject.authorID];
    let assetDetails = {
      videoID,
      videoObject,
      authorObject,
      src: videoObject.videoSrc,
    };
    async function getData() {
      let ownerVideos = await getUserVideos(authorObject.uid, "video", "");
      let authorVideos = getArcademyVideos(authorObject.uid);
      let filteredOwnerVideos = ownerVideos[0].filter((x) => x.id !== videoID);
      let getVouched = await isVouched(authorObject.addr);
      setVouched(getVouched);
      if (authorVideos[0] !== undefined) {
        setArcademyVideos(authorVideos[0]);
      }
      setContentObject(assetDetails);
      setOwnerVideos(filteredOwnerVideos);
      setIsLoading(false);
    }
    getData();
  }, [props]);

  function tweetLink(title, id) {
    return `https://twitter.com/intent/tweet?text=${encodeURI(
      `🚨 New Content by ${contentObject.authorObject.username}🚨\n\n` +
        title.replace("#", "no ") +
        "\n🐘🐘🐘🐘🐘🐘🐘🐘🐘 @Ar_Cademy\n"
    )}&url=https://arcademy.arweave.dev/%23/Playground/${videoID}`;
  }

  let cards = arcademyVideos.map((video, index) => {
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
              <h4 className="video-title">
                {contentObject.videoObject.videoTitle}
              </h4>
            </header>
            
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
              <Row display="flex" justify="flex-start" align="flex-end">
                <Link
                  to={`/profile/${contentObject.authorObject.addr}/${contentObject.authorObject.uid}`}
                >
                  <Avatar
                    src={contentObject.authorObject.avatar}
                    size="lg"
                    pointer="true"
                  />
                </Link>
                <Spacer x={0.5} />
                <Row align="flex-end">
                  <Text
                    css={{
                      color: "white",
                      fontWeight: "$semibold",
                      fontSize: "$xl",
                    }}
                  >
                    {contentObject.authorObject.author}
                  </Text>
                  <Spacer x={0.25} />
                  {vouched && (
                    <div style={{ marginBottom: "5px" }}>
                      <MdVerified
                        className="socialImageLinks"
                        size={15}
                        aria-hidden="true"
                        color="#1d9bf0"
                      />
                    </div>
                  )}
                </Row>

                <Row justify="flex-end">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="textNoDec"
                    href={tweetLink(
                      contentObject.videoObject.videoTitle,
                      videoID
                    )}
                    v="btn btn-outline btn-sm rounded-none font-normal"
                  >
                    <Tooltip
                      content={
                        <FaTwitter
                          color="#1d9bf0"
                          placement="bottom"
                          size={18}
                        />
                      }
                      css={{ bg: "white", p: 10, fontSize: 18 }}
                      hideArrow
                      placement="bottom"
                      offset={2}
                    >
                      <Button
                        flat
                        auto
                        rounded
                        css={{
                          color: "white",
                          bg: "white",
                          m: 6,
                          p: 6,
                          fontSize: 20,
                          zIndex: 1,
                        }}
                      >
                        <FcShare />
                      </Button>
                    </Tooltip>
                  </a>
                </Row>
              </Row>
              <Spacer y={0.5} />
              <Row css={{ borderRadius: "5px", backgroundColor: "#717c86" }}>
                <p
                  style={{
                    letterSpacing: "0.5px",
                    fontFamily: "Work Sans",
                    fontSize: "12px",
                    textAlign: "left",
                    padding: "5px",
                  }}
                >
                  {contentObject.videoObject.description}
                </p>
              </Row>
              <Spacer y={.5} />
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