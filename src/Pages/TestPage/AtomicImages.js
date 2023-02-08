import { Card, Grid, Row, Text, Col, Button, Spacer } from "@nextui-org/react";
import { Link } from "react-router-dom";


import image from "../../winstonMedia.png";

export default function AtomicImages(props) {
  return (
    <>
      {
        <Grid.Container gap={2} justify="flex-start">
          {props.images.map((img, index) => (
            <Grid xs={6} sm={2} key={index}>
              <Card>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={img.videoImageId !== undefined ? `https://ar-io.net/${img.videoImageId}` : image}
                    onError={(e) => {
                      e.target.src = image;
                    }}
                    objectFit="contain"
                    width="100%"
                    height={140}
                    alt={img.title}
                  />
                </Card.Body>
                <Card.Footer
                  isBlurred
                  css={{
                    position: "absolute",
                    bgBlur: "#ffffff66",
                    borderTop:
                      "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Col>
                    <Text size={10}>{img.title}</Text>
                  </Col>
                  <Col align="flex-end">
                    <Button flat auto rounded color="secondary" size="xs">
                      <Link
                        to={`/AtomicPlayground/${img.id}`}
                        className="textNoDec"
                      > <p className="pText">Play Video</p>
                        {/* <Text
                          css={{ color: "inherit" }}
                          size={10}
                          transform="uppercase"
                        >
                          
                        </Text> */}
                      </Link>
                    </Button>
                    <Spacer y={0.25} />
                    <Button flat auto rounded color="secondary" size="xs">
                      <Link
                        to={`/AssetManagement/${img.id}`}
                        className="textNoDec"
                      > <p className="pText">Overview</p>
                        {/* <Text
                          css={{ color: "inherit" }}
                          size={10}
                          transform="uppercase"
                        >
                          
                        </Text> */}
                      </Link>
                    </Button>
                  </Col>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      }
    </>
  );
}
