import { Card, Grid, Row, Text, Col, Button, Tooltip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";
import fallbackImage from "../../favicon.ico";

export default function MediaCards(props) {
  const { content, setState } = props;
  let { videoTitle } = content;
  if (videoTitle.length > 17) {
    videoTitle = videoTitle.slice(0,17) + "...";
  }
  console.log(content);
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
            padding:0
          }}
        >
          <Col css={{padding:0}}>
            
            
            <Row justify="center">
            <AiFillPlayCircle size={28} key={content.uid}
                  to={`/playground/${content.uid}`}
                  className="textNoDec"
                  onClick={setState}/>
            <Tooltip content={content.videoTitle}>
              <Text css={{p:0}} size={10}>{videoTitle}</Text>
            </Tooltip>
              {/* <Button flat auto rounded color="secondary" size="xs">
                <Link
                  key={content.uid}
                  to={`/playground/${content.uid}`}
                  className="textNoDec"
                  onClick={setState}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={10}
                    transform="uppercase"
                  >
                    PLAY
                  </Text>
                </Link>
              </Button> */}
              
              {/* <Button
                flat
                auto
                rounded
                className="mediaButton"
                bordered
                iconRight={<AiFillPlayCircle size={18} />}
                css={{ color: "#94f9f0", bg: "#94f9f026", m: 0 }}
              >
                <Link
                  key={content.uid}
                  to={`/playground/${content.uid}`}
                  className="textNoDec"
                  onClick={setState}
                >
                  
                  {/* <Text
                    css={{ color: "inherit" }}
                    size={10}
                    transform="uppercase"
                  >
                    PLAY
                  </Text> */}
                {/*</Link>
              </Button> */}
            </Row>
            
          </Col>
        </Card.Footer>
      </Card>
    </div>
  );
}
