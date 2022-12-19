import { Suspense, lazy } from "react";
import { KoiiCard } from "./KoiiCards";
import MediaCards from "./MediaCards";
import { Videos } from "src/Videos";
import AsyncImageLoader from "src/components/AsyncImageLoader";
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

function Card(props) {
  const navigate = useNavigate();
  let { content } = props;
  let cardDescriptionLength = content.description.length;
  if (cardDescriptionLength > 140) {
    content.description = content.description.slice(0, 140) + " ...";
  }

  let videoObject = Videos[content.uid];
  let videoTitle;
  if (videoObject.videoTitle.length > 20) {
    videoTitle = videoObject.videoTitle.slice(0, 20);
  } else {
    videoTitle = videoObject.videoTitle;
  }

  console.log(videoObject);
  return (
    <div key={videoObject.uid} className="moduleContent">
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
        <Tooltip content={videoObject.description} css={{ maxWidth: "140px" }}>
          <Button
            className="nav-link identity-link buttonText"
            onClick={() => navigate(`/playground/${content.uid}`)}
          >
            <AiOutlineArrowRight size={18} />
          </Button>
        </Tooltip>
      </Row>
    </div>
  );

  // return (
  //   <li className="moduleCards">
  //   {card}
  //   </li>
  // )
}

export { Card, KoiiCard, MediaCards };
