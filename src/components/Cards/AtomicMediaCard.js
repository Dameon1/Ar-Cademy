import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Text,
  Avatar,
  Spacer,
  Col,
  Tooltip,
} from "@nextui-org/react";
import { isVouched } from "../../lib/imgLib/stamp";
import { MdVerified } from "react-icons/md";
import { getProfile } from "../../lib/imgLib/account";
import image from "../../winston.png";

export default function AtomicMediaCard(props) {
  const { video, onClick } = props;
  const [creator, setCreator] = useState("");
  const [vouched, setVouched] = useState(false);

  useEffect(() => {
    async function getCreator() {
      //Which Avatar for creators ?
      let creator = await getProfile(video.owner);
      let getVouched = await isVouched(video.owner);
      setVouched(getVouched);
      setCreator(creator.profile);
    }
    getCreator();
  }, []);

  return (
    <Card isPressable onClick={onClick} css={{ border: ".5px solid white" }}>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={`https://ar-io.net/${video.videoImageId}`}
          width="100%"
          objectFit="contain"
          height={140}
          alt={video.title}
        />
      </Card.Body>
      <Card.Footer
        css={{
          justifyItems: "flex-start",
          p: 2,
          height: "65px",
          alignItems: "start",
          marginTop: "5px",
        }}
      >
        <Tooltip
          placement="rightStart"
          css={{ maxWidth: "200px" }}
          offset={0}
          hideArrow
          content={
            <>
              <h3 style={{}}>{video.title}</h3>
              <Row>
                <Text
                  css={{
                    color: "$accents7",
                    fontWeight: "$semibold",
                    fontSize: "$3xl",
                  }}
                >
                  {creator.name}
                </Text>

                {vouched && (
                  <MdVerified
                    className="socialImageLinks"
                    size={15}
                    aria-hidden="true"
                    color="#1d9bf0"
                  />
                )}
              </Row>
            </>
          }
        >
          <Avatar
            size="md"
            src={creator ? creator.avatarURL : image}
            alt="image"
            pointer="true"
          />
        </Tooltip>
        <Col css={{ padding: "0px 10px" }}>
          <Row wrap="wrap">
            <Text css={{ fontSize: "$md", textAlign:"left" }}>
              {video.title.length > 47
                ? video.title.slice(0, 47) + "..."
                : video.title}{" "}
            </Text>
          </Row>
          <Row>
            <Text
              css={{
                color: "$accents7",
                textAlign: "left",
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
                color="#1d9bf0"
              />
            )}
          </Row>
        </Col>
      </Card.Footer>
    </Card>
  );
}
