import { Card, Grid, Row, Text, Col, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

import fallbackImage from "../../favicon.ico";

export default function MediaCards(props) {
  const { content } = props;
  console.log(content);
  return (
    <Card css={{ mw: "400px" }}>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={content.videoImage}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
          objectFit="cover"
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
        }}
      >
        <Col>
          <Text size={10}>{content.title}</Text>
        </Col>
        <Col align="flex-end">
          <Button flat auto rounded color="secondary" size="xs">
            <Link to={`/AssetManagement/${content.id}`} className="textNoDec">
              <Text css={{ color: "inherit" }} size={10} transform="uppercase">
                Get Info
              </Text>
            </Link>
          </Button>
        </Col>
      </Card.Footer>
    </Card>
  );
}
