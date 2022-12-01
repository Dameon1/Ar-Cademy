import { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import MainContext from "../../context";
import Login from "src/components/Login/Login";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import { ethers } from "ethers";
import UseAns from "src/components/ANSForAll";
import ARKdisplay from "src/components/ANSForAll/ARKdisplay";
import {
  Button,
  Loading,
  Spacer,
  Row,
  Col,
  Container,
} from "@nextui-org/react";
import { AiOutlineUpload } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ArProfile from "src/components/ArProfile";
import Account from "arweave-account";

export function Dashboard() {
  const { addr, userData, setUserData } = useContext(MainContext);

  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (addr) {
      async function update() {
        //create user
        let user = {};

        //fetch ArProfile
        const account = new Account();
        user.ArProfile = await account.get(addr);

        //fetch Ark profile on Arweave
        const arArk = await fetch(
          `https://ark-core.decent.land/v2/profile/arweave/${addr}`
        );
        const ark = await arArk.json();

        //fetch Ark profile if no Arweave account
        if (ark.res === undefined) {
          if (addr.split(".")[0].length === 42) {
            let checksumAddress = ethers.utils.getAddress(addr);
            const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
            const ethArk = await fetch(ethString);
            const evmArk = await ethArk.json();
            if (evmArk) {
              user.ARK = evmArk.res;
              user.ANS = evmArk.res.ANS;
            }
            console.log(user.ANS);
          }
        } else {
          user.ARK = ark.res;
          user.ANS = ark.res.ANS;
        }

        //fetch ANS Data

        setUserData(user);
        setUserContent(user);
        setIsLoading(false);
      }
      update();
    }
  }, [addr, setUserData]);

  return (
    <div className="">
      <div className="text-container">
        <h2>Identity needs Security</h2>
        <p className="site-introduction">
          Identity is a topic that Arweave is looking to solve in multiple
          different ways. As our connection to the world grows, we need to be
          able to connect with the people and communities that we are connected
          to, with the Identity that we are comfortable with. Some of these are
          security risks to personal safety, privacy, and trust.
        </p>
      </div>
      <Spacer y={1} />
      {addr && (
        <Row align="center" justify="center">
          <Button
            className="nav-link identity-link buttonText"
            onClick={() => navigate("/upload")}
            iconRight={<AiOutlineUpload size={18} />}
          >
            Create
          </Button>
        </Row>
      )}
      <Spacer y={1} />
      {/*Create New ArProfile Component  */}
      {!addr && <Login />}
      {addr && (
        <Container
          className="gradient-border"
          style={{ padding: "5px", maxWidth: "640px" }}
        >
          <Row>
            <Col align="center">
              <h3>ArProfile:</h3>
              {addr && <ArProfile addr={addr} forDashboard={true} />}
            </Col>
            <Col align="center">
              <h3>ANS Profile:</h3>
              {addr && userContent?.ARK?.ARWEAVE?.ANS && !isLoading ? (
                <>
                  {console.log(userContent.ARK.primary_address)}
                  <ARKdisplay
                    content={userContent.ARK}
                    evmAddr={userContent.ARK.primary_address}
                  />
                </>
              ) : addr && !isLoading ? (
                <UseAns addr={addr} />
              ) : (
                <Loading />
              )}
            </Col>
          </Row>
        </Container>
      )}

      {addr && isLoading && (
        <>
          <p>Searching for content</p>
          <Loading />
        </>
      )}
      {addr &&
        userContent.ARK?.EVM[userContent.ARK.primary_address]?.POAPS &&
        !isLoading && (
          <ProfileContentContainer
            contentObjects={
              userContent.ARK?.EVM[userContent.ARK.primary_address]?.POAPS
            }
            contentType={"POAPS"}
            label="POAPS"
          />
        )}
      {addr && userContent.ARK?.NFTS && !isLoading && (
        <ProfileContentContainer
          contentObjects={userContent.ARK.NFTS}
          contentType={"NFTS"}
          label="NFTS"
        />
      )}
      {console.log("hi", userContent)}
      {addr && userContent?.ARK?.ARWEAVE?.STAMPS && !isLoading && (
        <ProfileContentContainer
          contentObjects={userContent.ARK.ARWEAVE.STAMPS}
          contentType={"STAMPS"}
          label="STAMPS"
        />
      )}

      {addr &&
        userContent?.ARK?.ARWEAVE.ANFTS?.permapages_img &&
        !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARK.ARWEAVE.ANFTS.permapages_img}
            contentType={"permapages_img"}
            label="permapages_img"
          />
        )}
      {addr && userContent?.ARK?.ARWEAVE?.ANFTS?.koii && !isLoading && (
        <ProfileContentContainer
          contentObjects={userContent.ARK.ARWEAVE.ANFTS.koii}
          contentType={"aNFTs"}
          label="koii"
        />
      )}
      {addr &&
        userContent?.ARK?.EVM[userContent.ARK.primary_address].ERC_NFTS &&
        !isLoading && (
          <ProfileContentContainer
            contentObjects={
              userContent.ARK.EVM[userContent.ARK.primary_address].ERC_NFTS
            }
            contentType={"ERC_NFTS"}
            label="ERC_NFTS"
          />
        )}
    </div>
  );
}
export default Dashboard;
