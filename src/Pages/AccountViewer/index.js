import { ethers } from "ethers";
import { useEffect, useState } from "react";

import "./accountViewer.css";
import UseAns from "src/components/ANSForAll";
import { ans as ansAPI } from "../../api/ANS/ans.js";
import ARKdisplay from "src/components/ANSForAll/ARKdisplay";
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
import ArProfile from "src/components/ArProfile";
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

  useEffect(() => {
    (async () => {
      try {
        if (addr.length === 0) return;
        let user;
        const arArk = await fetch(
          `https://ark-core.decent.land/v2/profile/arweave/${addr}`,
          {
            method: "GET",
            mode: "no-cors",
          }
        );
        const ark = await arArk.json();
        if (ark.res === undefined) {
          if (addr.split(".")[0].length === 42) {
            let checksumAddress = ethers.utils.getAddress(addr);
            const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
            const ethArk = await fetch(ethString, {
              method: "GET",
              mode: "no-cors",
            });
            const evmArk = await ethArk.json();
            user = evmArk.res;
          }
        } else {
          user = ark.res;
        }
        setUserContent(user);
        setIsSearching(false);
      } catch (e) {
        console.log(JSON.stringify(e));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [addr]);

  //let newCache = fetch("https://cache.permapages.app/jAE_V6oXkb0dohIOjReMhrTlgLW0X2j3rxIZ5zgbjXw").then((res) => res.json())

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

  // async function getCache(){
  //   let newCache = await fetch("https://cache.permapages.app/jAE_V6oXkb0dohIOjReMhrTlgLW0X2j3rxIZ5zgbjXw").then((res) => res.json());
  //   return newCache;
  // }

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
      {isLoading && (
        <Grid.Container gap={1} justify="center">
          <p className="pText">Searching for content</p>
          <Loading size="xl" css={{ padding: "$24" }} />
        </Grid.Container>
      )}
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

        {addr && userContent?.ARWEAVE?.ANFTS?.koii.length > 0 && !isLoading && (
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
