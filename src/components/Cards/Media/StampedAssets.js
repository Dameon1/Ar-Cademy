import { useContext, useEffect, useState } from "react";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import image from "../../../winstonMedia.png";
import Stamp from "../../Stamp";
import MainContext from "../../../context";
import { isVouched } from "../../../lib/imgLib/stamp";
export default function StampedAssets(props) {
  const { userData, addr } = useContext(MainContext);
  const [hasApproval, setHasApproval] = useState(false);
  let { content, notForDashboard } = props;
  
  useEffect(() => {
    async function getApproval() {
      let approval = await isVouched(addr)
      setHasApproval(approval)
    }
    getApproval()
  }, [addr])
  
  
  let description = content.description;
  if (description) {
    if (description.length > 14) {
      description = description.slice(0, 14) + " ...";
    }
  }
  let title = content.title;
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
                {description}
              </Text>
            </Col>
          </Card.Header>

          <Card.Body css={{ p: 20 }}>
            <Card.Image
              src={`https://arweave.net/${content.stampedAsset}`}
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
                    {(userData?.ARK?.ARWEAVE?.IS_VOUCHED || hasApproval) && notForDashboard && (
                      <Stamp txId={content.stampedAsset} />
                    )}
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
