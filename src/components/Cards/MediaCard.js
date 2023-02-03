import { useEffect, useState } from "react";
import { Card, Row, Text, Avatar, Spacer, Col, Tooltip } from "@nextui-org/react";
import { isVouched } from "../../lib/imgLib/stamp";
import { MdVerified } from "react-icons/md";
import { getProfile } from "../../lib/imgLib/account";
import image from "../../winston.png";
import { Authors } from "../../Authors";

export default function MediaCard(props) {
  const { video, onClick } = props;
  const [creator, setCreator] = useState("");
  const [vouched, setVouched] = useState(false);
  const [authorObject, setAuthorObject] = useState(null);
  let author = Authors[video.authorID];

  useEffect(() => {
    console.log(video, "video");
    let author = Authors[video.authorID];
    async function getCreator() {
      //Which Avatar for creators ?
      let getVouched = await isVouched(author.addr);
      setVouched(getVouched);
      setAuthorObject(author)
    }
    getCreator();
  }, []);

  return (
    <Card isPressable onClick={onClick} css={{border:".5px solid white", minHeight:"180px"}}>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={video.videoImage}
          objectFit= "contain"
          width="100%"
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
          css={{ width:"255px"}}
          offset={0}
          hideArrow
          content={
            <>
              <h3 style={{}}>{video.videoTitle}</h3>
              <Row>
                <Text
                  css={{
                    color: "$accents7",
                    fontWeight: "$semibold",
                    fontSize: "$3xl",
                  }}
                >
                  {author.author}
                </Text>

                {vouched && (
                  <MdVerified
                    className="socialImageLinks"
                    size={15}
                    aria-hidden="true"
                    color="blue"
                  />
                )}
              </Row>
            </>
          }
        >
        <Avatar
          size="md"
          src={author.avatar}
          alt="image"
          pointer="true"
        />
        </Tooltip>
        <Col css={{ padding: "0px 10px" }}>
          <Row >
            <Text css={{ fontSize: "$sm", textAlign:"left" }}>
              {video.videoTitle.length > 27
                ? video.videoTitle.slice(0, 27) + "..."
                : video.videoTitle}{" "}
            </Text>
          </Row>
          <Row>
            <Text
              css={{
                color: "$accents7",
                fontWeight: "$semibold",
                fontSize: "$sm",
              }}
            >
              {author.author}
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
  );
}
