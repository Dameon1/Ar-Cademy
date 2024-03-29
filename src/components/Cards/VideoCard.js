
import { Card, Row, Text, Col, Tooltip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import fallbackImage from "../../winstonMedia.png";

export default function VideoCard(props) {
  const { content, setState } = props;
  let { videoTitle } = content;
  if (videoTitle.length > 20) {
    videoTitle = videoTitle.slice(0, 20) + " ...";
  }
  return (
    <div>
      <Card css={{ mw: "400px" }}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={content.videoImage}
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
            objectFit="contain"
            width="100%"
            height={140}
            alt={content.title}
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#ffffff66",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
            padding: 0,
          }}
        >
          <Col>
            <Row justify="flex-start" css={{ padding: 3 }}>
              <Col>
                <Tooltip content={content.videoTitle}>
                  <Text size={10}>{videoTitle}</Text>
                </Tooltip>
              </Col>
              <Link
                key={content.uid}
                to={`/playground/${content.uid}`}
                className="textNoDec"
                onClick={setState}
              >
                <AiOutlinePlayCircle size={30} />
              </Link>

            </Row>
          </Col>
        </Card.Footer>
      </Card>
    </div>
  );
}
