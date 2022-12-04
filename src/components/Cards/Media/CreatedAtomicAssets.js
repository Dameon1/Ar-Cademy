import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import image from "../../../favicon.ico";
import Stamp from "../../Stamp";

export default function StampedAssets(props) {
  let { content } = props;
  let title = content.title;
  let type = content.stampedAssetType;
  if (title.length > 30) {
    title = title.substring(0, 26) + "...";
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mediaCards">
      <Card css={{ w: "100%", h: "300px", backgroundColor: "#023749" }}>
        <Card.Header
          css={{ position: "absolute", zIndex: 1, margin: "2px", padding: "0" }}
        >
          <Col>
            <Text h3 color="white" css={{ margin: "2px", padding: "0" }}>
              {title}
            </Text>
          </Col>
        </Card.Header>

        <Card.Body css={{ p: 30 }}>
          <Card.Image
            src={`https://arweave.net/${content.id}`}
            alt={title}
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
              <Row>
                <Col alignitems="flex-end">
                <Stamp txId={content.stampedAsset} />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify="center">
                <a
                  href={`https://img.arweave.dev/#/show/${content.stampedAsset}`}
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
                     On IMG
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
