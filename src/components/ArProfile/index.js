import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@nextui-org/react";
import MainContext from "../../context";

import {
  AvatarS,
  Bio,
  BoxVertoID,
  DetailsS,
  Name,
  UserAddr,
  UserSocial,
  VertoIDinfo,
} from "../../static/styles/Profile";

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
        console.log("addr:", user);
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
          <Loading size="xl" css={{ padding: "$24" }} color="success" />
        </Grid.Container>
      ) : hasFailed ? (
        <>
          <Spacer y={3} />
          <Grid.Container gap={1} justify="center">
            <Text color="error">Something wrong happened :(</Text>
          </Grid.Container>
          <Spacer y={2} />
          <Grid.Container gap={1} justify="center">
            <Button className="identity-link">Retry</Button>
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
              <Spacer y={1} />

              <div>
                {profileData?.links?.twitter && (
                  <UserSocial
                    href={`https://twitter.com/${profileData.links.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter size={25} />
                  </UserSocial>
                )}
                {profileData?.links?.github && (
                  <UserSocial
                    href={`https://github.com/${profileData.links.github}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub size={25} />
                  </UserSocial>
                )}
                {profileData?.links?.instagram && (
                  <UserSocial
                    href={`https://instagram.com/${profileData.links.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram size={25} />
                  </UserSocial>
                )}
                {profileData?.links?.facebook && (
                  <UserSocial
                    href={`https://facebook.com/${profileData.links.facebook}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebook size={25} />
                  </UserSocial>
                )}
                {profileData?.links?.discord && (
                  <span>
                    <FaDiscord size={25} />
                  </span>
                )}
              </div>
              <Spacer y={1} />

              {props.forDashboard && (
                <Button
                  auto
                  onClick={() => setModalIsOpen(true)}
                  iconRight={<FiEdit size={18} />}
                  className="identity-link"
                >
                  Edit Profile
                </Button>
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: "xx-large",
                  textAlign: "center",
                  padding: "70px",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  {` No Account Found `}
                  {` 🙂`}
                </div>

                {/* <Link to="/upload" className="textNoDec nav-link">
                  <Button
                    auto
                    className="nav-link identity-link"
                    css={{ marginTop: "30px" }}
                    iconRight={<AiOutlineUpload size={18} />}
                    color="success"
                  >
                    Create
                  </Button>
                </Link> */}
                <Button
                  auto
                  className="nav-link identity-link"
                  iconRight={<AiOutlineUpload size={18} />}
                  onClick={() => setModalIsOpen(true)}
                  color="success"
                  size="xl"
                  css={{ marginTop: "30px" }}
                >
                  Activate my Account
                </Button>
              </div>
            </>
          )}
        </>
      )}
      {/* <Button auto className="nav-link identity-link" css={{ marginTop: '30px' }}  iconRight={<AiOutlineUpload size={18} />} color="success">
              <Link to='/upload' className='textNoDec nav-link' >Create</Link>
              </Button> */}
    </>
  );
}

export default ArProfile;
