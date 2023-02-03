import { useEffect, useState, useContext } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import MainContext from "../../context";
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

import { AvatarS, Name } from "../../static/styles/Profile";
import Account from "arweave-account";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { isVouched } from "../../lib/imgLib/stamp";
import { MdVerified } from "react-icons/md";

function ArProfile(props) {
  const { userData } = useContext(MainContext);
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [vouched, setVouched] = useState(false);

  useEffect(() => {
    let { addr, forDashboard } = props;
    let getVouched = isVouched(addr);
    setVouched(getVouched);
    // addr.length === 43
    //   ? (addr = props.addr)
    //   : addr.length === 42
    //   ? (addr = userData.ARK.arweave_address)
    //   : (addr = 0);
    if (addr.length === 42) {
      if (userData?.ARK?.arweave_address.length === 43) {
        async function arProfile() {
          addr = userData.ARK.arweave_address;
          const account = new Account();
          const user = await account.get(addr);
          if (user) {
            setProfileData(user.profile);
          }
          setIsLoading(false);
        }
        arProfile();
      }
      return setIsLoading(false);
    }

    async function arProfile() {
      const account = new Account();
      const user = await account.get(addr);

      if (user) {
        setProfileData(user.profile);
      }
      setIsLoading(false);
    }
    if (addr.length === 43) {
      arProfile();
    }
  }, [props, userData]);

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
              <p className="pText">Retry</p>
            </Button>
          </Grid.Container>
          <Spacer y={3} />
        </>
      ) : (
        <Col align="center">
          <EditProfileModal
            addr={props.addr}
            profile={profileData}
            isOpen={modalIsOpen}
            hasClosed={() => setModalIsOpen(false)}
          />
          {profileData?.handleName?.length > 0 && (
            <>
              <Row align="center" justify="center">
                {profileData.name && <h3>{profileData.name}</h3>}
                <Col css={{width:"20px"}}>
                  {vouched && (
                    <MdVerified
                      className="socialImageLinks"
                      size={15}
                      aria-hidden="true"
                      color="blue"
                    />
                  )}
                </Col>
              </Row>
              <Row align="center" justify="center">
                {profileData.avatar ? (
                  <AvatarS
                    src={`https://arweave.net/${profileData.avatar}`}
                    sx={{ width: 90, height: 90 }}
                  />
                ) : (
                  <AvatarS
                    sx={{
                      width: 90,
                      height: 90,
                      fontSize: "large",
                      fontFamily: "monospace",
                    }}
                  >
                    #{props.addr.slice(0, 3)}
                    {props.addr.slice(-3)}
                  </AvatarS>
                )}
              </Row>
              <Spacer y={0.5} />

              <Row
                wrap="wrap"
                align="center"
                justify="space-around"
                css={{ maxWidth: "200px" }}
              >
                {profileData.links.twitter && (
                  <Tooltip content={`${profileData.links.twitter}`}>
                    <Link
                      href={`https://twitter.com/${profileData.links.twitter}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaTwitter
                        className="socialImageLinks"
                        size={20}
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
                        size={20}
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
                        size={20}
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
                        size={20}
                        className="socialImageLinks"
                        href={`https://facebook.com/${profileData.links.discord}`}
                        target="_blank"
                        rel="noreferrer"
                      />
                    </Link>
                  </Tooltip>
                )}
              </Row>
              <Spacer y={0.5} />

              <Row align="center" justify="center">
                <p
                  style={{
                    letterSpacing: "0.5px",
                    fontFamily: "Work Sans",
                    fontSize: "16px",
                  }}
                >
                  {profileData.bio}
                </p>
              </Row>
              <Spacer y={0.5} />

              <Row align="center" justify="center">
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
              </Row>
            </>
          )}
          {profileData?.handleName?.length > 0 ? (
            <Col align="center">
              <Spacer y={0.5} />
            </Col>
          ) : (
            <Col
              css={{
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Row align="center" justify="center">
                  <p
                    style={{
                      letterSpacing: "0.5px",
                      fontFamily: "Work Sans",
                      fontSize: "16px",
                    }}
                  >
                    No Account Found
                  </p>
                </Row>
                <Row align="center" justify="center">{` 🙂`}</Row>
              </div>
              
              {props.forDashboard && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://arweave.net/Zxz_DkB7ZVbHAWRJsy4_6o6q6Bu2DZGuOf9DphguWvQ?nocache=1672780622672"
                >
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
                  >
                    <p className="pText">Create an ArProfile</p>
                  </Button>
                </a>
              )}
            </Col>
          )}
        </Col>
      )}
    </>
  );
}

export default ArProfile;
