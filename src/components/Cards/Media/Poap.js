import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import image from "../../../winstonMedia.png";

export default function Poap(props) {
  let { content } = props;
  let title = content.event.name;
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
              {title}
            </Text>
          </Col>
        </Card.Header>

        <Card.Body css={{ p: 15 }}>
          <Card.Image
            src={content.event.image_url}
            alt={content.videoTitle}
            width="100%"
            height="100%"
            onError={(e) => {
              e.target.src = image;
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
              <Row justify="center">
                <Col alignitems="flex-end">
                  <p className="pText" style={{ color: "#ffa537" }}>
                    {content.event.year}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify="center">
                <a
                  href={`https://app.poap.xyz/token/${content.tokenId}`}
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
                      On Poap
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
