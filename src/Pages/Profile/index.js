import { useEffect, useState } from "react";

import AtomicVideoCards from "../../components/Cards/AtomicVideoCards";
import { useNavigate } from "react-router-dom";
import ARKdisplay from "../../components/ANSForAll/ARKdisplay";
import UseAns from "../../components/ANSForAll";
import "./profile.css";
import { MediaCard } from "../../components/Cards";
import ArProfile from "../../components/ArProfile";
import { Loading, Container, Row, Col } from "@nextui-org/react";
import {
  Poap,
  NearNFTS,
  EthereumNFTS,
} from "../../components/Cards/Media";

import getAllUserContent from "../../lib/getAllUserContent";

export default function Profile() {
  let urlArray = window.location.hash.split("/");
  let profileId = urlArray[urlArray.length - 1];
  let addr = urlArray[urlArray.length - 2];
  const navigate = useNavigate();
  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    let user = {};
    if (addr.split(".")[0].length === 43) {
      async function getContent() {
        let allContent = await getAllUserContent(profileId);
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
          setUserContent(user);
          setIsLoading(false);
          setIsSearching(false);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [addr]);

  return (
    <>
      <Row justify="center" align="center">
        <h2>Profile</h2>
      </Row>
      <div>
        {isLoading && (
          <>
            <Row justify="center">
              <p className="pText">Searching for content</p>
            </Row>
            <Row justify="center">
              <Loading />
            </Row>
          </>
        )}
     
        {addr && !isLoading && !isSearching && (
          <Container
            css={{
              maxWidth: "680px",
              border: "3px solid transparent",
              padding: "10px",
              borderImageSource: "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",  
              borderImageSlice: "30",
            }}
          >
            {addr && !isLoading && !isSearching && (
              <Row>
                <Col align="center">
                  <h3>ArProfile:</h3>
                  {addr && <ArProfile addr={addr} forDashboard={false} />}
                </Col>
                <Col align="center">
                  <h3>ANS Profile:</h3>
                  {addr && userContent?.ARK?.ARWEAVE && !isLoading ? (
                    <ARKdisplay
                      content={userContent.ARK}
                      evmAddr={userContent.ARK.primary_address}
                    />
                  ) : addr && !isLoading ? (
                    <>
                      <UseAns addr={addr} />
                    </>
                  ) : (
                    <Loading />
                  )}
                </Col>
              </Row>
            )}
          </Container>
        )}

        {addr && !isSearching && userContent?.ARCADEMY_VIDEOS?.length > 0 && (
          <div>
            <h3>Arcademy Videos</h3>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent.ARCADEMY_VIDEOS.map((video, i) => {
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
          userContent?.UPLOADED_VIDEOS?.length > 0 &&
          !isLoading && (
            <div>
              <h3>Owner Videos</h3>
              <div className="contentScrollContainer">
                <div className="hs">
                  {userContent.UPLOADED_VIDEOS.map((video, i) => {
                    return (
                      <div
                        className="videoThumbnails"
                        key={i}
                        onClick={() =>
                          navigate(`/AtomicPlayground/${video.id}`)
                        }
                      >
                        <AtomicVideoCards video={video} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        {addr && userContent?.POAPS?.length > 0 && !isLoading && (
          <>
            <h3>Poaps:</h3>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent.POAPS.map((content, i) => {
                  return (
                    <div key={i} className="mediaCards">
                      <Poap content={content} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {addr && userContent?.ARK?.NFTS?.length > 0 && !isLoading && (
          <>
            <h3>NEAR NFTS:</h3>
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
        {addr && userContent?.EVM?.length > 0 && !isLoading && (
          <>
            <h3>Ethereum NFTS:</h3>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent?.EVM?.map((content, i) => {
                  if (content?.metadata === null) return null;
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
        {addr &&
          userContent?.EVM?.[userContent.primary_address]?.ERC_NFTS &&
          !isLoading && (
            <>
              <h3>Ethereum NFTS:</h3>
              <div className="contentScrollContainer">
                <div className="hs">
                  {userContent?.EVM[userContent.primary_address].ERC_NFTS.map(
                    (content, i) => {
                      if (content?.metadata === null) return null;
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
          
        {/* {addr && userContent?.POLY?.length > 0 && !isLoading && (
          <>
            <h3>Polygon NFTS:</h3>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent?.POLY.map((content, i) => {
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

        {/* {addr &&
          userContent?.ARK?.ARWEAVE?.STAMPS?.length > 0 &&
          !isLoading && (
            <>
              <h3>Stamped Assets:</h3>
              <div className="contentScrollContainer">
                <div className="hs">
                  {userContent.ARK.ARWEAVE.STAMPS.map((content, i) => {
                    return (
                      <div key={i} className="mediaCards">
                        <StampedAssets
                          content={content}
                          notForDashboard={true}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )} */}

        {/* {addr &&
          userContent?.ARK?.ARWEAVE?.ANFTS?.permapages_img?.length > 0 &&
          !isLoading && (
            <>
              <h3>Created Atomic Assets:</h3>
              <div className="contentScrollContainer">
                <div className="hs">
                  {userContent?.ARK.ARWEAVE.ANFTS?.permapages_img.map(
                    (content, i) => {
                      return (
                        <div key={i} className="mediaCards">
                          <CreatedAtomicAssets
                            content={content}
                            notForDashboard={true}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </>
          )} */}

        {/* {addr && userContent?.AVAX?.length > 0 && userContent?.AVAX[0] !== false &&!isLoading && (
          <>
            <h3>Avalnche NFTS:</h3>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent?.AVAX.map((content, i) => {
                  return (
                    <div key={i} className="mediaCards">
                      <AvalancheNFTS content={content} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )} */}

      </div>
    </>
  );
}
