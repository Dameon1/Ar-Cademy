import { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import MainContext from "../../context";
import Login from "../../components/Login/Login";
import axios from "axios";
import { ethers } from "ethers";
import UseAns from "../../components/ANSForAll";
import ARKdisplay from "../../components/ANSForAll/ARKdisplay";
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
import ArProfile from "../../components/ArProfile";
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
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function retryFetch(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return retryFetch(url);
    }
  }

  useEffect(() => {
    if (addr === null) return;
    setIsLoading(true);
    console.log("userData", userData, userData?.ARK && userData?.ANS);
    if (userData) {
      return setIsLoading(false);
    }
    let user = {};
    if (addr.split(".")[0].length === 43) {
      async function update() {
        //create user
        try {
          //fetch ArProfile
          const account = new Account();
          //returns an empty object if no profile is found
          user.ArProfile = await account.get(addr);

          //fetch Ark profile or ANS profile from Arweave Addr
          await retryFetch(
            `https://ark-core.decent.land/v2/profile/arweave/${addr}`
          )
            .then((response) => response.json())
            .then(async (res) => {
              if (res.res === undefined) {
                await retryFetch(
                  `https://ans-testnet.herokuapp.com/profile/${addr}`
                )
                  .then((response) => {
                    if (!response.ok) {
                      const message = `An error has occured: ${response.status}`;
                      setError(message);
                    }
                    return response.json();
                  })
                  .then((res) => {
                    user.ANS = res;
                    console.log("setting ANS data");
                    setUserData(user);
                  });
              } else {
                user.ARK = res.res;
                setUserData(user);
              }
            });
        } catch (e) {
          console.log(e);
        }
      }
      update();
    }
    if (addr.split(".")[0].length === 42) {
      //let user = {};
      async function searchEVM() {
        try {
          let checksumAddress = ethers.utils.getAddress(addr);
          const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
          const ethArk = await retryFetch(ethString);
          const evmArk = await ethArk.json();
          user.ARK = evmArk.res;
          console.log("setting EVM data");
          setUserData(user);
          setIsLoading(false);
        } catch (e) {
          console.log("error", e);
        }
      }
      searchEVM();
    }
  }, [addr, userData]);

  return (
    <div className="">
      <div className="text-container">
        <h2>Identity needs Security</h2>
        <p className="pText">
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
            css={{
              color: "black",
              border: "2px solid #008c9e",
              fontSize: "0.75em",
              padding: "0.3em",
              backgroundColor: "white",
              transition: "all 0.2s ease-in-out",
            }}
            className="button buttonText"
            onClick={() => navigate("/upload")}
            iconRight={<AiOutlineUpload size={18} />}
          >
            <p className="pText">Create</p>
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
              {error?.message ? <p>{error.message}</p> : null}
              {/* {addr && userData?.ARK?.ARWEAVE?.ANS && !isLoading && (
                <>
                  <ARKdisplay
                    content={userData.ARK}
                    evmAddr={userData.ARK.primary_address}
                  />
                </>
              )}

              {addr && userData?.ANS && !isLoading && (
                <UseAns addr={addr} forDashboard={true} />
              )} */}
              {addr && isLoading ? (
                <Loading />
              ) : addr && userData?.ARK?.EVM && !isLoading ? (
                <ARKdisplay
                  content={userData.ARK}
                  evmAddr={userData.ARK.primary_address}
                />
              ) : (
                <UseAns addr={addr} forDashboard={true} />
              )}
            </Col>
          </Row>
        </Container>
      )}

      {addr && isLoading && (
        <>
          <p className="pText">Searching for content</p>
          <Loading />
        </>
      )}

      {/*Poaps*/}
      {addr &&
        userData?.ARK?.EVM[userData.ARK.primary_address]?.POAPS?.length > 0 &&
        !isLoading && (
          <>
            <h1>Poaps:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData.ARK.EVM[userData.ARK.primary_address].POAPS.map(
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

      {addr && userData?.ARK?.NFTS?.length > 0 && !isLoading && (
        <>
          <h1>NEAR NFTS:</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userData.ARK.NFTS.map((content, i) => {
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
      {addr && userData?.ARK?.ARWEAVE?.STAMPS?.length > 0 && !isLoading && (
        <>
          <h1>Stamped Assets:</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userData.ARK.ARWEAVE.STAMPS.map((content, i) => {
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
        userData?.ARK?.ARWEAVE.ANFTS?.permapages_img?.length > 0 &&
        !isLoading && (
          <>
            <h1>Created Atomic Assets:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData?.ARK?.ARWEAVE.ANFTS?.permapages_img.map(
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
        userData?.ARK?.ARWEAVE?.ANFTS?.koii?.length > 0 &&
        !isLoading && (
          <>
            <h1>Koii NFTS:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData?.ARK?.ARWEAVE?.ANFTS?.koii.map((content, i) => {
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
        userData?.ARK?.EVM[userData.ARK.primary_address]?.ERC_NFTS?.length >
          0 &&
        !isLoading && (
          <>
            <h1>Ethereum NFTS:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData?.ARK?.EVM[userData.ARK.primary_address].ERC_NFTS.map(
                  (content, i) => {
                    return (
                      <div key={i} className="mediaCards">
                        <EthereumNFTS content={content} />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}
    </div>
  );
}
export default Dashboard;
