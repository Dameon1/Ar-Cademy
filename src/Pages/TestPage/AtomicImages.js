import { Card, Grid, Row, Text, Col, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

import fallbackImage from "../../favicon.jpg";

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
                    src={`https://arweave.net/${img.id}`}
                    onError={(e) => {
                      e.target.src = fallbackImage;
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
                        to={`/AssetManagement/${img.id}`}
                        className="textNoDec"
                      >
                        <Text
                          css={{ color: "inherit" }}
                          size={10}
                          transform="uppercase"
                        >
                          Get Info
                        </Text>
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
