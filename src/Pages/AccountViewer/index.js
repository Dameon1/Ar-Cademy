import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";

import MainContext from "../../context";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import "./accountViewer.css";
import ArweaveAccount from "src/components/ArweaveAccount";
import UseAns from "src/components/ANSForAll";
import { ans as ansAPI } from "../../api/ANS/ans.js";
import ANSdisplay from "src/components/ANSForAll/ANSdisplay";
import {Grid, Loading} from "@nextui-org/react";
import UserProfile from 'src/components//UserProfile/UserProfile';


export function AccountViewer() {
  const { walletName, disconnectWallet } = useContext(MainContext);
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
        console.log(user)
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
    } else { return ansName}
  }

  // async function getCache(){
  //   let newCache = await fetch("https://cache.permapages.app/jAE_V6oXkb0dohIOjReMhrTlgLW0X2j3rxIZ5zgbjXw").then((res) => res.json());
  //   return newCache;
  // }

  function onSubmit(event) {
    event.preventDefault();
    let ansAddr = getAddrByANS(input)
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

  function isEmpty(input=[]) { return Object.keys(input).length !== 0};

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
        <div className="">
          <p>Test Addr: zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE</p>
        </div>
        <form onSubmit={onSubmit}>
          <label aria-labelledby="input"></label>
          <input
            placeholder="Enter address"
            onChange={handleInput}
            required
            maxLength="44"
            size="48"
          />
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
      <div>
        {addr && !isLoading && !isSearching && (
          <ArweaveAccount addr={addr}  disconnectWallet={disconnectWallet}/>
        )}

        {isSearching && ( 
          <>
            <p>Searching for content</p>
            <Loading />
          </>
        )}

        {addr && userContent && !isSearching 
          ? (<ANSdisplay content={userContent.ANS} />) 
          : addr && !isSearching 
          ? (<UseAns addr={addr} />) 
          : null
        }

        {isEmpty(userContent.POAPS) &&  (
          <ProfileContentContainer contentObjects={userContent.POAPS} contentType={"POAPS"} label="POAPS" />
        )}
        {isEmpty(userContent.STAMPS) &&  (
          <ProfileContentContainer contentObjects={userContent.STAMPS} contentType={"STAMPS"} label="STAMPS" />
        )}
        {isEmpty(userContent.ANFTS) && !isSearching && (
          <ProfileContentContainer contentObjects={userContent.ANFTS.permapages_img} contentType={"permapages_img"} label="permapages_img"/>
        )}
        {isEmpty(userContent.ANFTS) &&  (
          <ProfileContentContainer contentObjects={userContent.ANFTS.koii} contentType={"aNFTs"} label="koii"/>
        )}
        {isEmpty(userContent.ERC_NFTS) &&  (
          <ProfileContentContainer contentObjects={userContent.ERC_NFTS} contentType={"ERC_NFTS"} label="ERC_NFTS"/>
        )}

        {/* {addr && userContent && !isSearching && (
          
        )}

        {addr && userContent && !isSearching && (
        )}

        {addr && userContent && !isSearching && (
        )}

        {addr && userContent && !isSearching && (
        )} */}
      </div>
    </>
  );
}
export default AccountViewer;
