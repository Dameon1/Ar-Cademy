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

import { AvatarS, Bio, Name } from "../../static/styles/Profile";

import Account from "arweave-account";

import EditProfileModal from "../EditProfileModal/EditProfileModal";

function ArProfile(props) {
  const { userData } = useContext(MainContext);
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    console.log("reloaded")
    let { addr, forDashboard } = props;
    // addr.length === 43
    //   ? (addr = props.addr)
    //   : addr.length === 42
    //   ? (addr = userData.ARK.arweave_address)
    //   : (addr = 0);
    console.log(addr.length,"reloaded")
    if (addr.length === 42) {
      if (userData?.ARK?.arweave_address.length === 43) {
        async function arProfile() {
          addr = userData.ARK.arweave_address;
          const account = new Account();
          const user = await account.get(addr);
          console.log(user, "reloaded")
          if (user) {
            setProfileData(user.profile);
          }
          setIsLoading(false);
        }
         arProfile();
        // addr = userData.ARK.arweave_address;
        // const account = new Account();
        // const user = account.get(addr);
        // console.log(user, "reloaded")
        // setProfileData(user.profile);
        // return setIsLoading(false);
      }
      return setIsLoading(false);
    }
    // if(addr.length === 42) {
    //   return
    // }

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
    // const account = new Account();
    // const user = account.get(addr);
    // console.log(user)
    // if (user) {
    //   setProfileData(user.profile);
    // }
    // setIsLoading(false)
    //  console.log(userData?.ArProfile?.txid === undefined,  userData.ArProfile === undefined , userData?.ARK.arweave_address.length > 0)
    // if (forDashboard && userData?.ArProfile?.txid === undefined &&  userData.ArProfile === undefined && userData?.ARK.arweave_address.length > 0) {
    //     console.log("true")
    //     addr = userData.ARK.arweave_address;
    //   }
    // (async () => {
    //   try {
    //     const account = new Account();
    //     const user = await account.get(addr);
    //     console.log(addr)
    //     if (user) {
    //       setProfileData(user.profile);
    //     }
    //   } catch (e) {
    //     setHasFailed(JSON.stringify(e));
    //   } finally {
    //     setIsLoading(false);
    //   }
    // })();
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
        <>
          <EditProfileModal
            addr={props.addr}
            profile={profileData}
            isOpen={modalIsOpen}
            hasClosed={() => setModalIsOpen(false)}
          />
         

          {
            // Dispaly account details
          }
          {profileData?.handleName?.length > 0 ? (
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

                  <p className="pText">{profileData.bio}</p>
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
                  <p className="pText">No Account Found{` 🙂`}</p>
                </div>
                <Spacer y={1} />
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
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ArProfile;
