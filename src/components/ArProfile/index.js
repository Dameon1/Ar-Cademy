import { useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import {
  Button,
  Grid,
  Loading,
  Text,
  Spacer,
  Row,
  Col,
  Link,
  Tooltip,
} from "@nextui-org/react";

import { AvatarS, Bio, Name } from "../../static/styles/Profile";

import Account from "arweave-account";

import EditProfileModal from "../EditProfileModal/EditProfileModal";

function ArProfile(props) {
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const account = new Account();
        const user = await account.get(props.addr);
        if (user) {
          setProfileData(user.profile);
        }
      } catch (e) {
        setHasFailed(JSON.stringify(e));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [props.addr]);

  return (
    <>
      {isLoading ? (
        <Grid.Container gap={1} justify="center">
          <Loading />
        </Grid.Container>
      ) : hasFailed ? (
        <>
          <Spacer y={3} />
          <Grid.Container gap={1} justify="center">
            <Text color="error">Something wrong happened :(</Text>
          </Grid.Container>
          <Spacer y={2} />
          <Grid.Container gap={1} justify="center">
            <Button
              css={{
                color: "black",
                border: "2px solid #008c9e",
                fontSize: "0.75em",
                padding: "0.3em",
                backgroundColor: "white",
                transition: "all 0.2s ease-in-out",
              }}
              className="button buttonText"
            >
              Retry
            </Button>
          </Grid.Container>
          <Spacer y={3} />
        </>
      ) : (
        <>
          <EditProfileModal
            addr={props.addr}
            profile={profileData}
            isOpen={modalIsOpen}
            hasClosed={() => setModalIsOpen(false)}
          />

          {profileData ? (
            <>
              <Row align="center">
                <Col align="center">
                  {profileData.avatar ? (
                    <AvatarS
                      src={`https://arweave.net/${profileData.avatar}`}
                      sx={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <AvatarS
                      sx={{
                        width: 100,
                        height: 100,
                        fontSize: "large",
                        fontFamily: "monospace",
                      }}
                    >
                      #{props.addr.slice(0, 3)}
                      {props.addr.slice(-3)}
                    </AvatarS>
                  )}
                  {profileData.name && <Name>{profileData.name}</Name>}
                  <Bio>{profileData.bio}</Bio>
                </Col>
              </Row>

              <Row wrap="wrap" align="center" justify="space-around">
                {profileData.links.twitter && (
                  <Tooltip content={`${profileData.links.twitter}`}>
                    <Link
                      href={`https://twitter.com/${profileData.links.twitter}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaTwitter
                        className="socialImageLinks"
                        size={25}
                        aria-hidden="true"
                      />
                    </Link>
                  </Tooltip>
                )}
                {profileData?.links?.instagram && (
                  <Tooltip content={`${profileData.links.instagram}`}>
                    <Link
                      href={`https://instagram.com/${profileData.links.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram className="socialImageLinks" size={25} />
                    </Link>
                  </Tooltip>
                )}
                {profileData?.links?.facebook && (
                  <Tooltip content={`${profileData.links.facebook}`}>
                    <Link
                      href={`https://facebook.com/${profileData.links.facebook}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebook
                        href={`https://facebook.com/${profileData.links.facebook}`}
                        target="_blank"
                        rel="noreferrer"
                        className="socialImageLinks"
                        size={25}
                      />
                    </Link>
                  </Tooltip>
                )}
                {profileData.links.github && (
                  <Tooltip content={`${profileData.links.github}`}>
                    <Link
                      href={`https://github.com/${profileData.links.github}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-hidden="true"
                    >
                      <FaGithub
                        href={`https://github.com/${profileData.links.github}`}
                        size={25}
                        className="socialImageLinks"
                      />
                    </Link>
                  </Tooltip>
                )}
                {profileData?.links?.discord && (
                  <Tooltip content={`${profileData.links.github}`}>
                    <Link
                      href={`https://github.com/${profileData.links.github}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-hidden="true"
                    >
                      <FaDiscord
                        size={25}
                        className="socialImageLinks"
                        href={`https://facebook.com/${profileData.links.discord}`}
                        target="_blank"
                        rel="noreferrer"
                      />
                    </Link>
                  </Tooltip>
                )}
              </Row>
              <Spacer y={1} />

              {props.forDashboard && (
                <Button
                  auto
                  css={{
                    color: "black",
                    border: "2px solid #008c9e",
                    fontSize: "0.75em",
                    padding: "0.3em",
                    backgroundColor: "white",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onClick={() => setModalIsOpen(true)}
                  iconRight={<FiEdit size={18} />}
                  className="button buttonText"
                >
                  <p className="pText">Edit Profile</p>
                </Button>
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  {` No Account Found `}
                  {` 🙂`}
                </div>
                <Spacer y={1} />
                {props.forDashboard && (
                  <Button
                    auto
                    css={{
                      color: "black",
                      border: "2px solid #008c9e",
                      fontSize: "0.75em",
                      padding: "0.3em",
                      backgroundColor: "white",
                      transition: "all 0.2s ease-in-out",
                    }}
                    className="button buttonText"
                    iconRight={<AiOutlineUpload size={18} />}
                    onClick={() => setModalIsOpen(true)}
                  >
                    <p className="pText">Create an ArProfile</p>
                  </Button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ArProfile;
