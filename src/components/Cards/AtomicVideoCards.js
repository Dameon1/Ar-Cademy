import { Card, Grid, Row, Text, Col, Button, Spacer } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import image from "../../winstonMedia.png";

export default function AtomicVideoCards(props) {
  const { video, setState } = props;
  return (
    <>
      {
        <Card>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={
                video.videoImageId !== undefined
                  ? `https://arweave.net/${video.videoImageId}`
                  : image
              }
              onError={(e) => {
                e.target.src = image;
              }}
              objectFit="contain"
              width="100%"
              height={140}
              alt={video.title}
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
            }}
          >
            <Col>
              <Text size={10}>{video.title}</Text>
            </Col>
            <Col align="flex-end">
              <Link
                to={`/AtomicPlayground/${video.id}`}
                className="textNoDec"
                onClick={setState}
              >
                {" "}
                <AiOutlinePlayCircle size={30} />
                {/* <Text
                          css={{ color: "inherit" }}
                          size={10}
                          transform="uppercase"
                        >
                          
                        </Text> */}
              </Link>

              <Spacer y={0.25} />
              {/* <Button flat auto rounded color="secondary" size="xs">
                <Link
                key={video.id}
                to={`/playground/${video.uid}`}
                className="textNoDec"
                onClick={setState}
              >
                <AiOutlinePlayCircle size={30} />
              </Link>
                <Link to={`/AssetManagement/${video.id}`} className="textNoDec">
                  {" "}
                  <p className="pText">Overview</p>
                 
                </Link>
              </Button> */}
            </Col>
          </Card.Footer>
        </Card>
      }
    </>
  );
}
