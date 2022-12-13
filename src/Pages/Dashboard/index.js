import { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import MainContext from "../../context";
import Login from "src/components/Login/Login";

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
import { useNavigate } from "react-router-dom";
import ArProfile from "src/components/ArProfile";
import Account from "arweave-account";
import {
  Poap,
  NearNFTS,
  Koii,
  EthereumNFTS,
  StampedAssets,
  CreatedAtomicAssets,
} from "../../components/Cards/Media";

export function Dashboard() {
  const { addr, setUserData, userData } = useContext(MainContext);

  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUserContent(userData);
      setIsLoading(false);
      return;
    }
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
            }
          }
        } else {
          user.ARK = ark.res;
        }

        //fetch ANS Data
        setUserData(user);
        setUserContent(user);
        setIsLoading(false);
      }
      update();
    }
  }, [addr, setUserData, userData]);

  return (
    <div className="">
      <div className="text-container">
        <h2>Identity needs Security</h2>
        <p className="page-introduction">
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
                  <ARKdisplay
                    content={userContent.ARK}
                    evmAddr={userContent.ARK.primary_address}
                  />
                </>
              ) : addr && !isLoading ? (
                <UseAns addr={addr} forDashboard={true} />
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

      {/*Poaps*/}
      {addr &&
        userContent.ARK?.EVM[userContent.ARK.primary_address]?.POAPS?.length >
          0 &&
        !isLoading && (
          <>
            <h1>Poaps:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent.ARK.EVM[userContent.ARK.primary_address].POAPS.map(
                  (content, i) => {
                    return (
                      <div key={i} className="mediaCards">
                        <Poap content={content} />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}

      {addr && userContent?.ARK?.NFTS?.length > 0 && !isLoading && (
        <>
          <h1>NEAR NFTS:</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userContent.ARK.NFTS.map((content, i) => {
                return (
                  <div key={i} className="mediaCards">
                    <NearNFTS content={content} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {addr && userContent?.ARK?.ARWEAVE?.STAMPS?.length > 0 && !isLoading && (
        <>
          <h1>Stamped Assets:</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userContent.ARK.ARWEAVE.STAMPS.map((content, i) => {
                return (
                  <div key={i} className="mediaCards">
                    <StampedAssets content={content} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {addr &&
        userContent?.ARK?.ARWEAVE.ANFTS?.permapages_img?.length > 0 &&
        !isLoading && (
          <>
            <h1>Created Atomic Assets:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent?.ARK?.ARWEAVE.ANFTS?.permapages_img.map(
                  (content, i) => {
                    return (
                      <div key={i} className="mediaCards">
                        <CreatedAtomicAssets content={content} />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}

      {addr &&
        userContent?.ARK?.ARWEAVE?.ANFTS?.koii?.length > 0 &&
        !isLoading && (
          <>
            <h1>Koii NFTS:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent?.ARK?.ARWEAVE?.ANFTS?.koii.map((content, i) => {
                  return (
                    <div key={i} className="mediaCards">
                      <Koii content={content} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      {addr &&
        userContent?.ARK?.EVM[userContent.ARK.primary_address]?.ERC_NFTS?.length > 0 &&
        !isLoading && (
          <>
            <h1>Ethereum NFTS:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent?.ARK?.EVM[
                  userContent.ARK.primary_address
                ].ERC_NFTS.map((content, i) => {
                  return (
                    <div key={i} className="mediaCards">
                      <EthereumNFTS content={content} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
    </div>
  );
}
export default Dashboard;
