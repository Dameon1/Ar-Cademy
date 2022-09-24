import { ethers } from "ethers";
import Account from "arweave-account";
import { useContext, useEffect, useState } from "react";

import MainContext from "../../context";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import "./accountViewer.css";
import ArweaveAccount from "src/components/ArweaveAccount";
import UseAns from "src/components/ANSForAll";
import { ans } from "../../api/ANS/ans.js";

import { Button, Grid, Loading, Text, Spacer } from '@nextui-org/react';

export function AccountViewer() {
  const { walletName, disconnectWallet } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addr, setAddr] = useState();
  const [input, setInput] = useState();
  const [isSearching, setIsSearching] = useState();

  useEffect(() => {
    (async () => {
      try {
        let user;
        const arweaveAccount = new Account();
        const arweaveAccountUser = await arweaveAccount.get(addr);
        console.log("arweaveAccount:", arweaveAccountUser);
        setUserContent([]);
        let address = addr;
        const res = await fetch(
          `https://ark-api.decent.land/v1/profile/arweave/${address}`
        );
        const ans = await res.json();
        user = ans;
        if (Object.entries(user).length === 0 || ans.res === undefined) {
          let checksumAddress = ethers.utils.getAddress(address);
          const ethString = `https://ark-api.decent.land/v1/profile/evm/${checksumAddress}`;
          const eth = await fetch(ethString);
          const ens = await eth.json();
          user = ens.res;
          setUserContent(user);
        } else {
          setUserContent(ans.res);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(JSON.stringify(e));
      } finally {
        console.log("done");
        setIsLoading(false)
        setIsSearching(false)
      }
    })();
  }, [addr]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  function getAddrByANS(ansName) {
    const ansHandle = ans.find((holder) => holder.username === ansName);
    if (ansHandle) {
      return ansHandle.address;
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const ansAddr = getAddrByANS(input)
    console.log(ansAddr)
    setAddr(ansAddr || input);
    setIsLoading(!isLoading);
    setIsSearching(true)
  }
  
  return (
    <>
      <div className="text-container acctViewTextContainer">
        <h2>Search Arweave Related Kontent</h2>
        <p className="site-introduction">
          Enter an address by ( ANS, Arweave 42, Ethereum 43) to find the Arweave related content associated
          connected to it.
        </p>
        <p> --Not all users have content to display or have created
          an account on the various network calls that are made here.--
        </p>
        <div className="">
        <p>Test Addr: zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE</p>
      </div>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Enter address"
            onChange={handleInput}
            required
            maxLength="44"
            size="48"
          />
          <button type="submit">
            search
          </button>
        </form>
      </div>
      
      <div className="inputBox">
        <p>Current Addr: {addr}</p>
      </div>
      {(isSearching && <Grid.Container gap={1} justify="center">
        <Loading size="xl" css={{ padding: '$24' }} color="success" />
      </Grid.Container>)}
      <div className="">
        {Object.entries(userContent).length !== 0 && addr && !isLoading && (
          <ArweaveAccount
            addr={addr}
            walletName={walletName}
            disconnectWallet={disconnectWallet}
          />
        )}
        {Object.entries(userContent).length !== 0 && addr && !isLoading && (
          <UseAns
            addr={addr}
            walletName={walletName}
            disconnectWallet={disconnectWallet}
          />
        )}
        {Object.entries(userContent).length !== 0 && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.STAMPS}
            contentType={"STAMPS"}
            label="STAMPS"
          />
        )}
        {isLoading && <div>Loading</div>}
        {Object.entries(userContent).length !== 0 && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.POAPS}
            contentType={"POAPS"}
            label="POAPS"
          />
        )}
        {Object.entries(userContent).length !== 0 && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ANFTS.koii}
            contentType={"aNFTs"}
            label="koii"
          />
        )}
        {Object.entries(userContent).length !== 0 && !isLoading && (
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
