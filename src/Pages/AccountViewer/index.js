import { ethers } from "ethers";
import { useEffect, useState } from "react";

import "./accountViewer.css";
import UseAns from "../../components/ANSForAll";
import { ans as ansAPI } from "../../api/ANS/ans.js";
import ARKdisplay from "../../components/ANSForAll/ARKdisplay";
import {
  Grid,
  Loading,
  Container,
  Row,
  Col,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import ArProfile from "../../components/ArProfile";
import {
  Poap,
  NearNFTS,
  Koii,
  EthereumNFTS,
  StampedAssets,
  CreatedAtomicAssets,
} from "../../components/Cards/Media";

export function AccountViewer() {
  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [addr, setAddr] = useState("");
  const [input, setInput] = useState();
  const [isSearching, setIsSearching] = useState(false);

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
    if (addr.split(".")[0].length === 43) {
      async function getUserData() {
        try {
          const arArk = await retryFetch(
            `https://ark-core.decent.land/v2/profile/arweave/${addr}`
          );
          const ark = await arArk.json();
          setUserContent(ark.res);
          setIsSearching(false);
          setIsLoading(false);
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      }
      getUserData();    
    }
  }, [addr])

  useEffect(() => {
    if (addr.split(".")[0].length === 42) {
      async function getUserData() {
        try {
          let checksumAddress = ethers.utils.getAddress(addr);
          const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
          const ethArk = await retryFetch(ethString);
          const evmArk = await ethArk.json();
          setUserContent(evmArk.res);
          setIsSearching(false);
          setIsLoading(false);
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

  //const isEmpty = (input) => Object.keys(input).length === 0;

  return (
    <>
      <div className="text-container acctViewTextContainer">
        <h2>Search Arweave Related Content</h2>
        <p className="pText">
          Enter an address by ANS, Arweave, or Eth address to find the Arweave
          related content.
        </p>
        <p className="pText">
          Test Addr: zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE
        </p>
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
              type="submit"
            >
              search
            </Button>
          </Row>
          <p className="pText">Current Addr: {addr}</p>
        </form>
      </div>
      <Spacer y={1} />
     {isSearching && (
        <>
          <p className="pText">Searching for content</p>
          <Loading />
        </>
      )}
      <div>
        {addr && !isLoading && !isSearching && (
          <Container
            className="gradient-border"
            style={{ padding: "5px", maxWidth: "680px" }}
          >
            {addr && (
              <Row>
                <Col align="center">
                  <h3>ArProfile:</h3>
                  {addr && <ArProfile addr={addr} forDashboard={false} />}
                </Col>
                <Col align="center">
                  <h3>ANS Profile:</h3>
                  {addr && userContent?.ARWEAVE && !isLoading ? (
                    <ARKdisplay
                      content={userContent}
                      evmAddr={userContent.primary_address}
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

        {addr && userContent?.primary_address && !isLoading && (
          <>
            <h1>Poaps:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent.EVM[userContent.primary_address].POAPS.map(
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
        {console.log("User Content:", userContent)}

        {addr && userContent?.NFTS && !isLoading && (
          <>
            <h1>NEAR NFTS:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent.NFTS.map((content, i) => {
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

        {addr && userContent?.ARWEAVE?.STAMPS && !isLoading && (
          <>
            <h1>Stamped Assets:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent.ARWEAVE.STAMPS.map((content, i) => {
                  return (
                    <div key={i} className="mediaCards">
                      <StampedAssets content={content} notForDashboard={true} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {addr && userContent?.ARWEAVE?.ANFTS?.permapages_img && !isLoading && (
          <>
            <h1>Created Atomic Assets:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent?.ARWEAVE.ANFTS?.permapages_img.map(
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
        )}

        {addr && userContent?.ARWEAVE?.ANFTS?.koii?.length > 0 && !isLoading && (
          <>
            <h1>Koii NFTS:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userContent?.ARWEAVE?.ANFTS?.koii.map((content, i) => {
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
