import { ethers } from "ethers";
import { useEffect, useState } from "react";

import ProfileContentContainer from "src/components/ProfileContentContainer";
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
        let resolvedAddr = fetch(`https://ark-core.decent.land/v2/address/resolve/${addr}`)
          .then((res) => res.json());
        resolvedAddr = await resolvedAddr;
        console.log("????????????",resolvedAddr);

        let user;
        const arArk = await fetch(
          `https://ark-core.decent.land/v2/profile/arweave/${addr}`
        );
        const ark = await arArk.json();
        if (ark.res === undefined) {
          if (addr.split(".")[0].length === 42) {
            let checksumAddress = ethers.utils.getAddress(addr);
            const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
            const ethArk = await fetch(ethString);
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
    let ansAddr = getAddrByANS(input);
    
    // async function sanitizeAddr(text) {
    //   //regular Arweave
    //   let sanitized = "";
    //   //ANS
    //   //ETH
    //   //ANS
    // }
    //sanitizeAddr(input)
    setAddr(ansAddr);
    setUserContent({});
    setIsSearching(true);
  }

  const isEmpty = (input) => Object.keys(input).length === 0;

  return (
    <>
      <div className="text-container acctViewTextContainer">
        <h2>Search Arweave Related Content</h2>
        <p>
          Enter an address by ANS, Arweave, or Eth address to find the Arweave
          related content.
        </p>
        <p>Test Addr: zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE</p>
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
            <Button className="identity-link buttonText" type="submit">
              search
            </Button>
          </Row>
          <p>Current Addr: {addr}</p>
        </form>
      </div>
      <Spacer y={1} />
      {isLoading && (
        <Grid.Container gap={1} justify="center">
          <p>Searching for content</p>
          <Loading size="xl" css={{ padding: "$24" }} />
        </Grid.Container>
      )}
      {isSearching && (
        <>
          <p>Searching for content</p>
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
                      {console.log(userContent)}
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
        {console.log("hi", userContent)}
        {addr && userContent?.primary_address && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.EVM[userContent.primary_address]?.POAPS}
            contentType={"POAPS"}
            label="POAPS"
          />
        )}

        {addr && userContent?.NFTS && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.NFTS}
            contentType={"NFTS"}
            label="NFTS"
          />
        )}

        {addr && userContent?.ARWEAVE?.STAMPS && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARWEAVE.STAMPS}
            contentType={"STAMPS"}
            label="STAMPS"
          />
        )}

        {addr && userContent?.ARWEAVE?.ANFTS?.permapages_img && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARWEAVE.ANFTS.permapages_img}
            contentType={"permapages_img"}
            label="permapages_img"
          />
        )}

        {addr && userContent?.ARWEAVE?.ANFTS?.koii && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARWEAVE.ANFTS.koii}
            contentType={"aNFTs"}
            label="koii"
          />
        )}

        {addr &&
          userContent?.EVM?.[userContent.primary_address]?.ERC_NFTS &&
          !isLoading && (
            <ProfileContentContainer
              contentObjects={
                userContent.EVM[userContent.primary_address].ERC_NFTS
              }
              contentType={"ERC_NFTS"}
              label="ERC_NFTS"
            />
          )}
      </div>
    </>
  );
}
export default AccountViewer;
