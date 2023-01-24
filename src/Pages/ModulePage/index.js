import { useState, useEffect } from "react";

import { Topics } from "../../Topics";
import { Videos } from "../../Videos";
import { Link } from "react-router-dom";
import {
  Button,
  Image,
  Spacer,
  Row,
  Col,
  Container,
  Tooltip,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Card } from "../../components/Cards";
import { getDataByTopic } from "../../Queries/AppQueries";

function ModulePage() {
  const navigate = useNavigate();
  const module = new URL(window.location.href).pathname.split("/").at(-1);
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



  const contentCards = uploadedVideoContent.map((video, index) => {
    let videoTitle;
    if (video.title.length > 20) {
      videoTitle = video.title.slice(0, 20);
    } else {
      videoTitle = video.title;
    }
    console.log(videoTitle, video )
    return (
      <>
      <li key={video.id || index} className="moduleContent">
      <img
        src={`https://arweave.net/${video.videoImageId}`}
        className="heroImage"
        alt={`Title of this video is ${video.title}`}
      />
      <Row flex="wrap" justify="center">
        <Tooltip
          content={video.title}
          placement="top"
          css={{ maxWidth: "140px" }}
        >
          <h4>{videoTitle}</h4>
        </Tooltip>
      </Row>

      <Row justify="center">
        <Tooltip
          content={video.description}
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
            onClick={() => navigate(`/AtomicPlayground/${video.id}`)}
          >
            <AiOutlineArrowRight size={18} />
          </Button>
        </Tooltip>
      </Row>
    </li>
    
        </>
    )
  });


  return (
    <>
      <div>
        <h1>{module}</h1>
        <ul className="moduleCards">{contentCards}{topicCards}</ul>
      </div>
    </>
  );
}

export default ModulePage;
