import { useContext, useEffect, useState } from "react";
import MainContext from "../../context";
import Login from "../../components/Login/Login";
import { ethers } from "ethers";
import UseAns from "../../components/ANSForAll";
import ARKdisplay from "../../components/ANSForAll/ARKdisplay";
import AtomicVideoCards from "../../components/Cards/AtomicVideoCards";
import {
  Button,
  Loading,
  Spacer,
  Row,
  Col,
  Container,
  Tooltip
} from "@nextui-org/react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ArProfile from "../../components/ArProfile";
import { MediaCard } from "../../components/Cards";
import {
  Poap,
  NearNFTS,
  EthereumNFTS,
} from "../../components/Cards/Media";

import getAllUserContent from "../../lib/getAllUserContent";
import { retryFetch } from "../../utils";

export function Dashboard() {
  const { addr, setUserData, userData } = useContext(MainContext);
  const [isSearching, setIsSearching] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (addr === null) return;
    setIsLoading(true);
    if (userData) {
      return setIsLoading(false);
    }
    let user = {};
    if (addr.split(".")[0].length === 43) {
      async function getContent() {
        let allContent = await getAllUserContent(addr);
        return allContent;
      }
      getContent()
        .then((res) => {
          user.EVM = res[0];
          user.POLY = res[1];
          user.BSC = res[2];
          user.FTM = res[3];
          user.AVAX = res[4];
          user.ARK = res[5].res;
          user.POAPS = res[6].POAPS;
          user.ARCADEMY_VIDEOS = res[7];
          user.UPLOADED_VIDEOS = res[8][0];
          return user;
        })
        .then((user) => {
          setUserData(user);
          setIsLoading(false);
          setIsSearching(false);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    if (addr.split(".")[0].length === 42) {
      async function getUserData() {
        try {
          let checksumAddress = ethers.utils.getAddress(addr);
          const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
          await retryFetch(ethString).then((res) => {
            let user = res.res;
            user.POAPS = user.EVM[user.primary_address].POAPS;
            user.ARK = res.res;
            setUserData(user);
            setIsSearching(false);
            setIsLoading(false);
          });
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      }
      getUserData();
    }
  }, [addr]);

  return (
    <div className="">
      <div className="text-container">
        <h2>Identity needs Security</h2>
        <p className="pText">
          Unlock the power of secure and trusted connections with Arweave's
          innovative Identity solutions - ANS and ArProfile! As our world
          becomes more interconnected, it's time to say goodbye to compromising
          personal safety, privacy, and trust in our connections.
        </p>
      </div>
      <Spacer y={1} />
      {addr && (
        <Row align="center" justify="center">
          <Tooltip content="create" placement="bottom" hideArrow>
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
            iconRight={<AiOutlineVideoCameraAdd size={18} />}
          />
            
        </Tooltip>
        </Row>
      )}
      <Spacer y={1} />
      {!addr && <Login />}
      {addr && (
        <Container
          css={{
            maxWidth: "680px",
            border: "3px solid transparent",
            padding: "10px",
            borderImageSource:
              "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
            borderImageSlice: "30",
          }}
        >
          <Row>
            <Col align="center">
              <h3>ArProfile:</h3>
              {addr && <ArProfile addr={addr} forDashboard={true} />}
            </Col>
            <Col align="center">
              <h3>ANS Profile:</h3>
              {error?.message ? <p>{error.message}</p> : null}
              {addr && userData?.ARK?.EVM && !isLoading ? (
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
          <Row align="center" justify="center">
            <p className="pText">Searching for content</p>
          </Row>
          <Row align="center" justify="center">
            <Loading />
          </Row>
        </>
      )}

      {addr && !isSearching && userData?.ARCADEMY_VIDEOS?.length > 0 && (
        <div>
          <h1>Arcademy Videos</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userData.ARCADEMY_VIDEOS.map((video, i) => {
                return (
                  <div
                    className="videoThumbnails"
                    key={i}
                    onClick={() => navigate(`/playground/${video.uid}`)}
                  >
                    <MediaCard video={video} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {addr &&
        !isSearching &&
        userData?.UPLOADED_VIDEOS?.length > 0 &&
        !isLoading && (
          <div>
            <h1>Owner Videos</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData.UPLOADED_VIDEOS.map((video, i) => {
                  return (
                    <div
                      className="videoThumbnails"
                      key={i}
                      onClick={() => navigate(`/AtomicPlayground/${video.id}`)}
                    >
                      <AtomicVideoCards video={video} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
      {/*NEAR*/}
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
      {/*ETHEREUM BASED*/}
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


      {/*Unused Polygon based*/}
      {/* {addr && userData?.POLY?.length > 0 && !isLoading && (
        <>
          <h1>Polygon NFTS:</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userData?.POLY.map((content, i) => {
                return (
                  <div key={i} className="mediaCards">
                    <PolygonNFTS content={content} index={i} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )} */}

      {/* OLD ARWEAVE STAMPING
      
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
        )} */}
    </div>
  );
}
export default Dashboard;
