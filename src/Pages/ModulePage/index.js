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

function ModulePage() {
  const navigate = useNavigate();
  const module = new URL(window.location.href).pathname.split("/").at(-1);
  const videoIds = Topics[module].videosById;

  let topicCards = videoIds.map((videoId, index) => {
    let videoObject = Videos[videoId];
    let videoTitle;
    if (videoObject.videoTitle.length > 20) {
      videoTitle = videoObject.videoTitle.slice(0, 20);
    } else {
      videoTitle = videoObject.videoTitle;
    }

    console.log(videoObject);
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
              className="nav-link identity-link buttonText"
              onClick={() => navigate(`/playground/${videoId}`)}
            >
              <AiOutlineArrowRight size={18} />
            </Button>
          </Tooltip>
        </Row>
      </li>
    );
  });

  return (
    <>
      <div>
        <h1>{module}</h1>
        <ul className="moduleCards">{topicCards}</ul>
      </div>
    </>
  );
}

export default ModulePage;
