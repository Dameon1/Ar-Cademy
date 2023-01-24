import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import fallbackImage from "../../../winstonMedia.png";
import NFTViewer from "./NFTViewer";


export default function PolygonNFTS(props) {
  let { content } = props;
  let dataObject;
  let image = fallbackImage;
  let title= "Non confroming NFT";


  if (content.name === null) {
    title = "Non confroming NFT";
  }
  if (content.name=== undefined) {
    title = "Non confroming NFT";
  }
  if (content.metadata === undefined) {
    title = "Non confroming NFT";
  }
  if (content.metadata === null) {
    title = "Non confroming NFT";
  }

  if(content.metadata){
    dataObject = JSON.parse(content.metadata);
  }

  if (content.metadata !== undefined && content.metadata !== null) {
    dataObject = JSON.parse(content.metadata);
  }
  if(dataObject === undefined) {
    dataObject = {
      name: "non conforming NFT",
      image: fallbackImage,
    }
  }
  if (dataObject !== null || dataObject === undefined) {
    title = dataObject.name;
    // dataObject = {
    //   name: title,
    //   image: fallbackImage,
    // }
  }
  //let { image } = dataObject;

  if (image === undefined || image === null) {
    image =
      fallbackImage
  }
  if(content.image !== undefined && content.image !== null) {
    image = content.image;
  }
  image = image.replace("ipfs://ipfs", "https://ipfs.io/ipfs/");
  image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
  // title = dataObject.name;
  
  
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

        <Card.Body css={{ pt: 50 }}>
          {/* NFTViewer is for Presentation */}
          <NFTViewer content={content} />
          {/* <Card.Image
            src={image}
            alt={content.videoTitle}
            width="100%"
            height="100%"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          /> */}
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
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify="center">
                <a
                  href={`https://opensea.io/assets/matic/${content.token_address}/${content.token_id}`}
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
                      On OpenSea
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
