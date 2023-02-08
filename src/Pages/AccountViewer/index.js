import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAns from "../../components/ANSForAll";
import { ans as ansAPI } from "../../api/ANS/ans.js";
import ARKdisplay from "../../components/ANSForAll/ARKdisplay";
import AtomicVideoCards from "../../components/Cards/AtomicVideoCards";
import ArProfile from "../../components/ArProfile";
import { MediaCard } from "../../components/Cards";
import {

  Loading,
  Container,
  Row,
  Col,
  Input,
  Spacer,
  
} from "@nextui-org/react";
import {
  Poap,
  NearNFTS,
  EthereumNFTS,
} from "../../components/Cards/Media";

import getAllUserContent from "../../lib/getAllUserContent";

export function AccountViewer() {
  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [addr, setAddr] = useState("");
  const [input, setInput] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  async function retryFetch(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
        },
      });
      return response.json();
    } catch (error) {
      console.error(error);
      console.log("retrying fetch");
      return retryFetch(url);
    }
  }

  useEffect(() => {
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
          setUserContent(user);
          setIsLoading(false);
          setIsSearching(false);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [addr]);

  useEffect(() => {
    if (addr.split(".")[0].length === 42) {
      async function getUserData() {
        try {
          let checksumAddress = ethers.utils.getAddress(addr);
          const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
          await retryFetch(ethString).then((res) => {
            let user = res.res;
            user.POAPS = user.EVM[user.primary_address].POAPS;
            user.ARK = res.res;
            setUserContent(user);
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

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  function getAddrByANS(ansName) {
    const ansHandle = ansAPI.find((holder) => holder.username === ansName);
    if (ansHandle) {
      return ansHandle.address;
    } else {
      return ansName;
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    if (input === addr) return;
    let ansAddr = getAddrByANS(input);
    setAddr(ansAddr);
    setUserContent({});
    setIsSearching(true);
  }


  return (
    <>
      <div className="text-container acctViewTextContainer">
        <h2>Search Arweave Related Content</h2>
        <p className="pText">
          Enter an address by ANS, Arweave, or Eth address to find the Arweave
          related content.
        </p>
        <Row justify="center" align="center">
          <p className="pText">Test Addr:</p>
        </Row>
        <Row justify="center" align="center">
          <p className="pText" style={{ fontSize: "12px" }}>
            zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE
          </p>
        </Row>
        <form onSubmit={onSubmit}>
          <label aria-labelledby="input"></label>
          <Spacer y={1} />
          <Input
            clearable
            placeholder="Enter address"
            onChange={handleInput}
            labelPlaceholder="Enter address"
            width="320px"
            status="primary"
            required
          />
          <Spacer y={1} />
          <Row justify="center" align="center">
            <p className="pText">Current Addr: </p>
          </Row>
          <Row justify="center" align="center">
            <p className="pText" style={{ fontSize: "12px" }}>
              {addr}
            </p>
          </Row>
        </form>
      </div>
      <Spacer y={1} />
      {isSearching && (
        <>
          <Row justify="center">
            <p className="pText">Searching for content</p>
          </Row>
          <Row justify="center">
            <Loading />
          </Row>
        </>
      )}
      <div>
        {addr && !isLoading && !isSearching && (
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
            {addr && (
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
            <h1>Arcademy Videos</h1>
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
              <h1>Owner Videos</h1>
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
            <h1>Poaps:</h1>
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
        {addr && userContent?.EVM?.length > 0 && !isLoading && (
          <>
            <h1>Ethereum NFTS:</h1>
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
              <h1>Ethereum NFTS:</h1>
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

      </div>
    </>
  );
}
export default AccountViewer;
