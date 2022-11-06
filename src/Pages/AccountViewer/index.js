import { ethers } from "ethers";
import { useEffect, useState } from "react";

import ProfileContentContainer from "src/components/ProfileContentContainer";
import "./accountViewer.css";
import UseAns from "src/components/ANSForAll";
import { ans as ansAPI } from "../../api/ANS/ans.js";
import ANSdisplay from "src/components/ANSForAll/ANSdisplay";
import { Grid, Loading, Container, Row, Col, Input, Spacer } from "@nextui-org/react";
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
        let user;
        const arArk = await fetch(
          `https://ark-api.decent.land/v1/profile/arweave/${addr}`
        );
        const ark = await arArk.json();
        if (ark.res === undefined) {
          if (addr.split(".")[0].length === 42) {
            let checksumAddress = ethers.utils.getAddress(addr);
            const ethString = `https://ark-api.decent.land/v1/profile/evm/${checksumAddress}`;
            const ethArk = await fetch(ethString);
            const evmArk = await ethArk.json();
            user = evmArk.res;
          }
        } else {
          user = ark.res;
        }
        console.log("userrrrrrrrrrrrrr========", user);
        setUserContent(user);
        setIsSearching(false);
      } catch (e) {
        console.log(JSON.stringify(e));
      } finally {
        console.log("done");
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
          Enter an address by ANS, Arweave, or Eth identity to find the Arweave
          related content.
        </p>
        <p>
          *Not all users have content to display or have created an account on
          the various network calls that are made here.--
        </p>
          <p>Test Addr: zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE</p>
        <form onSubmit={onSubmit}>
          <label aria-labelledby="input"></label>
          <Input clearable placeholder="Enter address"
            onChange={handleInput}
            required />
            <Spacer y={1}/>
          <button type="submit">search</button>
          <p>Current Addr: {addr}</p>
        </form>
      </div>

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
          <Container className="gradient-border" style={{ padding: "5px" }}>
            {addr && (
              <Row>
                <Col align="center">
                  <h3>ArProfile:</h3>
                  {addr && <ArProfile addr={addr} forDashboard={false} />}
                </Col>
                <Col align="center">
                  <h3>ArkProfile:</h3>
                  {addr && userContent?.ANS && !isLoading ? (
                    <ANSdisplay content={userContent.ANS} />
                  ) : addr && !isLoading ? (
                    <UseAns addr={addr} />
                  ) : (
                    <Loading />
                  )}
                </Col>
              </Row>
            )}
          </Container>
        )}

        {addr && userContent?.POAPS && !isSearching && (
          <ProfileContentContainer
            contentObjects={userContent.POAPS}
            contentType={"POAPS"}
            label="POAPS"
          />
        )}

        {addr && userContent?.STAMPS && !isSearching && (
          <ProfileContentContainer
            contentObjects={userContent.STAMPS}
            contentType={"STAMPS"}
            label="STAMPS"
          />
        )}

        {addr && userContent?.ANFTS?.permapages_img && !isSearching && (
          <ProfileContentContainer
            contentObjects={userContent.ANFTS.permapages_img}
            contentType={"permapages_img"}
            label="permapages_img"
          />
        )}

        {addr && userContent?.ANFTS?.koii && !isSearching && (
          <ProfileContentContainer
            contentObjects={userContent.ANFTS.koii}
            contentType={"aNFTs"}
            label="koii"
          />
        )}

        {addr && userContent?.ERC_NFTS && !isSearching && (
          <ProfileContentContainer
            contentObjects={userContent.ERC_NFTS}
            contentType={"ERC_NFTS"}
            label="ERC_NFTS"
          />
        )}
      </div>
    </>
  );
}
export default AccountViewer;
