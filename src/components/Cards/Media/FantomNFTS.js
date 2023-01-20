import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import fallbackImage from "../../../winstonMedia.png";
import NFTViewer from "./NFTViewer";

export default function FantomNFTS(props) {
  let { content } = props;
  let image;
  let dataObject;
  if (content.metadata === null || content.metadata === undefined || content.metadata === false) {
    console.log("content.metadata---------", content);
    image = fallbackImage;
    dataObject = content
  } else {
    dataObject = JSON.parse(content.metadata);
    image = dataObject.image;
  }
  if (image === undefined) {
    image = fallbackImage;
  }
  console.log(typeof image)
  image = image.replace("ipfs://ipfs", "https://ipfs.io/ipfs/");
  image = image.replace("ipfs://", "https://ipfs.io/ipfs/");

  let title;
  if (content.name === null && dataObject !== null) {
    title = dataObject.name;
  } else {
    title = content.name;
  }

  if (title.length > 26) {
    title = title.substring(0, 26) + "...";
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mediaCards">
      <Card
        css={{ w: "100%", h: "290px", backgroundColor: "#023749" }}
        className="mediaCardBorder"
      >
        <Card.Header
          css={{
            position: "absolute",
            zIndex: 1,
            margin: "2px",
            padding: "0",
          }}
        >
          <Col>
            <Text h3 color="white" css={{ margin: "2px", padding: "0" }}>
              {content.name}
            </Text>
          </Col>
        </Card.Header>

        <Card.Body css={{ pt: 15 }}>
          <Card.Image
            src={image}
            alt={content.videoTitle}
            width="100%"
            height="100%"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Row>
                <Col alignitems="flex-end">
                  {/* <Text color="#d1d1d1" size={12}>
                      {"content.event.year"}
                    </Text> */}
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify="center">
                <a
                  href={`https://marketplace.kalao.io/nft/${content.token_address}_${content.token_id}`}
                  className="textNoDec"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    flat
                    auto
                    rounded
                    className="mediaButton"
                    css={{ color: "#94f9f0", bg: "#94f9f026", m: 6 }}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      On Kalao
                    </Text>
                  </Button>
                </a>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
}
