import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import { Button, Grid, Loading, Text, Spacer } from "@nextui-org/react";

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

import { T_addr, T_profile, T_walletName, T_txid } from "../../utils/types";
import Account from "arweave-account";

import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { AMW } from "../../utils/api";

function UserProfile({
  addr,
  walletName,
  disconnectWallet,
}: {
  addr: T_addr;
  walletName: T_walletName;
  disconnectWallet: () => void;
}) {
  const [profileData, setProfileData] = useState<T_profile>();
  const [profileTxid, setProfileTxid] = useState<T_txid>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState<string | false>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const account = new Account();
        const user = await account.get(addr);
        if (user) {
          setProfileData(user.profile);
          setProfileTxid(user.txid);
          setBalance(await AMW.getBalance());
        }
      } catch (e) {
        setHasFailed(JSON.stringify(e));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [addr]);

  return (
    <div className="gradient-border" style={{ padding: "5px" }}>
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
            <Button
              color="secondary"
              onClick={disconnectWallet}
              className="identity-link"
            >
              Retry
            </Button>
          </Grid.Container>
          <Spacer y={3} />
        </>
      ) : (
        <>
          <EditProfileModal
            addr={addr}
            profile={profileData}
            isOpen={modalIsOpen}
            hasClosed={() => setModalIsOpen(false)}
          />

          

          {profileData ? (
            <>
            <Grid.Container gap={3} justify="space-between" alignItems="center">
            <Button
              auto
              onClick={() => setModalIsOpen(true)}
              iconRight={<FiEdit size={18} />}
              className="identity-link"
            >
              Edit Profile
            </Button>
            <Button
                  auto
                  className="nav-link identity-link "
                  onClick={() => console.log("upload file")}
                  iconRight={<AiOutlineUpload size={18} />}
                  color="success"
                >
                  <Link to="/upload" className="textNoDec nav-link">
                    Create
                  </Link>
                </Button>
            {/* {walletName === "bundlr" && <>
              Balance: {balance}
              <a href="https://demo.bundlr.network/" target="_blank" rel="noreferrer">Top-up my bundlr account</a>
            </>} */}
          </Grid.Container>
              {profileTxid && (
                <Grid.Container gap={2} justify="center">
                  {/* <a href={`https://viewblock.io/arweave/tx/${profileTxid}`} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: "larger" }}>
                txid: {profileTxid}
              </a> */}
                </Grid.Container>
              )}
              <BoxVertoID>
                {profileData.avatar ? (
                  <AvatarS
                    src={`https://arweave.net/${profileData.avatar}`}
                    sx={{ width: 200, height: 200 }}
                  />
                ) : (
                  <AvatarS
                    sx={{
                      width: 200,
                      height: 200,
                      fontSize: "xx-large",
                      fontFamily: "monospace",
                    }}
                  >
                    #{addr.slice(0, 3)}
                    {addr.slice(-3)}
                  </AvatarS>
                )}
                <VertoIDinfo>
                  {profileData.name && <Name>{profileData.name}</Name>}
                  <UserAddr
                    href={`https://viewblock.io/arweave/address/${addr}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{profileData.handle}
                  </UserAddr>
                  <DetailsS>
                    <Bio>{profileData.bio}</Bio>
                    {profileData.links.twitter && (
                      <UserSocial
                        href={`https://twitter.com/${profileData.links.twitter}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTwitter size={25} />
                      </UserSocial>
                    )}
                    {profileData.links.github && (
                      <UserSocial
                        href={`https://github.com/${profileData.links.github}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub size={25} />
                      </UserSocial>
                    )}
                    {profileData.links.instagram && (
                      <UserSocial
                        href={`https://instagram.com/${profileData.links.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaInstagram size={25} />
                      </UserSocial>
                    )}
                    {profileData.links.facebook && (
                      <UserSocial
                        href={`https://facebook.com/${profileData.links.facebook}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebook size={25} />
                      </UserSocial>
                    )}
                    {profileData.links.discord && (
                      <span>
                        <FaDiscord size={25} /> {profileData.links.discord}
                      </span>
                    )}
                  </DetailsS>
                </VertoIDinfo>
              </BoxVertoID>
              <Grid.Container
                gap={3}
                justify="space-between"
                alignItems="center"
              >
                
                {/* <Button auto onClick={() => console.log("upload file")} iconRight={<AiOutlineUpload size={18} />} color="success">Create</Button> */}
              </Grid.Container>
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
             <Button auto
                    className="nav-link identity-link"
                    iconRight={<AiOutlineUpload size={18} />} onClick={() => setModalIsOpen(true)} color="success" size="xl" css={{ marginTop: '30px' }}>Activate my Account</Button> 
              </div>
            </>
          )}
        </>
      )}
      {/* <Button auto className="nav-link identity-link" css={{ marginTop: '30px' }}  iconRight={<AiOutlineUpload size={18} />} color="success">
              <Link to='/upload' className='textNoDec nav-link' >Create</Link>
              </Button> */}
    </div>
  );
}

export default UserProfile;
