import { useState, useEffect } from "react";
import { Card, Row, Text, Col, Avatar, Spacer } from "@nextui-org/react";
import { getProfile } from "../../lib/imgLib/account";
import image from "../../winston.png";
import { isVouched } from "../../lib/imgLib/stamp";
import { MdVerified } from "react-icons/md";

//TODO: Add a switch for creator's profile image

export default function CreatorContentCard(props) {
  const { content, onClick } = props;
  const [creator, setCreator] = useState("");
  const [vouched, setVouched] = useState(false);

  useEffect(() => {
    async function getCreator() {
      //Which Avatar for creators ?
      let creator = await getProfile(content.owner);
      let getVouched = await isVouched(content.owner);
      setVouched(getVouched);
      setCreator(creator.profile);
    }
    getCreator();
  }, []);

  return (
    <li key={content.id} onClick={onClick}>
      <Card isPressable css={{ width: "100%", padding:"5px" }} className="creatorContentCard">
        <Card.Body
          css={{
            p: 0,
            boxShadow: "1px 2px 8px 2px rgba(0, 0, 0, 0.35)",
            height: "130px",
          }}
        >
          <Card.Image
            src={`https://arweave.net/${content.videoImageId}`}
            alt={`Follow of ${content.title}`}
            objectFit="cover"
          />
        </Card.Body>
        <Card.Footer
          css={{
            justifyItems: "flex-start",
            p: 2,
            height: "65px",
            alignItems: "start",
            marginTop: "10px",
          }}
        >
          <Avatar
            size="md"
            src={creator ? creator.avatarURL : image}
            alt="image"
            pointer="true"
          />

          <Col css={{ padding: "0px 10px" }}>
            <Text css={{ fontSize: "$sm" }}>
              {content.title.length > 47
                ? content.title.slice(0, 47) + +"..."
                : content.title}{" "}
            </Text>
            <Row>
              <Text
                css={{
                  color: "$accents7",
                  fontWeight: "$semibold",
                  fontSize: "$sm",
                }}
              >
                {creator.name}
              </Text>
              <Spacer x={0.25} />
              {vouched && (
                <MdVerified
                  className="socialImageLinks"
                  size={15}
                  aria-hidden="true"
                  color="blue"
                />
              )}
            </Row>
          </Col>
        </Card.Footer>
      </Card>
    </li>
  );
}
