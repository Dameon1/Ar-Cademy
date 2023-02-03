import { useState, useEffect } from "react";

import { Topics } from "../../Topics";
import { Videos } from "../../Videos";
import { Button, Row, Tooltip, Grid } from "@nextui-org/react";
import { AtomicMediaCard, MediaCard } from "../../components/Cards";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getDataByTopic } from "../../Queries/AppQueries";

function ModulePage() {
  const navigate = useNavigate();
  const module = window.location.hash.split("/").at(-1);
  const videoIds = Topics[module].videosById;
  const [uploadedVideoContent, setUploadedVideoContent] = useState([]);

  //Todo: need to change this at the contract level, until then this lowers for search
  const searchableString = (string) => {
    return string.charAt(0).toLowerCase() + string.substring(1).toLowerCase();
  };

  useEffect(() => {
    getDataByTopic(searchableString(module)).then((data) => {
      setUploadedVideoContent(data);
    });
  }, [module]);

  let topicCards = videoIds.map((videoId, index) => {
    let videoObject = Videos[videoId];
    let videoTitle;
    if (videoObject.videoTitle.length > 15) {
      videoTitle = videoObject.videoTitle.slice(0, 15) + "...";
    } else {
      videoTitle = videoObject.videoTitle;
    }

    return (
      <li key={videoObject.videoId || index} className="moduleContent">
        <img
          src={videoObject.videoImage}
          className="heroImage"
          alt={`Follow of ${videoObject.title}`}
        />
        <Row flex="wrap" justify="center">
          <Tooltip
            content={videoObject.videoTitle}
            placement="top"
            css={{ maxWidth: "140px" }}
          >
            <h4>{videoTitle}</h4>
          </Tooltip>
        </Row>

        <Row justify="center">
          <Tooltip
            content={videoObject.description}
            css={{ maxWidth: "140px" }}
          >
            <Button
              css={{
                color: "black",
                border: "2px solid #008c9e",
                fontSize: "0.75em",
                padding: "0.3em",
                backgroundColor: "white",
                transition: "all 0.2s ease-in-out",
              }}
              className="button buttonText"
              onClick={() => navigate(`/playground/${videoId}`)}
            >
              <AiOutlineArrowRight size={18} />
            </Button>
          </Tooltip>
        </Row>
      </li>
    );
  });

  const AtomicMediaCards = uploadedVideoContent.map((video, index) => {
    return (
      <Grid xs={6} sm={3} md={2} key={index}>
        <AtomicMediaCard video={video} onClick={() => navigate(`/AtomicPlayground/${video.id}`)} />
      </Grid>
    );
  });

  const MediaCards = videoIds.map((videoId, index) => {
    let video = Videos[videoId];
    return (
      <Grid xs={6} sm={3} md={2} key={index}>
        <MediaCard video={video}  onClick={() => navigate(`/playground/${videoId}`)} />
      </Grid>
    );
  });

  return (
    <>
      <div>
        <h1>{module}</h1>
        {/* <ul className="moduleCards">
          {contentCards}
          {topicCards}
        </ul> */}
        <Grid.Container gap={2} justify="flex-start">
          {AtomicMediaCards}
          {MediaCards}
        </Grid.Container>
      </div>
    </>
  );
}

export default ModulePage;
