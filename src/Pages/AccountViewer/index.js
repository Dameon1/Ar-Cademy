import { ethers } from "ethers";
import Account from "arweave-account";
import { useContext, useEffect, useState } from "react";

import MainContext from "../../context";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import "./accountViewer.css";
import ArweaveAccount from "src/components/ArweaveAccount";
import UseAns from "src/components/ANSForAll";
import { ans as ansAPI } from "../../api/ANS/ans.js";

import { Button, Grid, Loading, Text, Spacer } from "@nextui-org/react";

export function AccountViewer() {
  const { walletName, disconnectWallet } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addr, setAddr] = useState('');
  const [input, setInput] = useState();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if(addr.length !== 43 ) return  
        console.log(addr)
        const arweaveAccount = new Account();
        let user={};
        user.ARWEAVEACCOUNT = await arweaveAccount.get(addr);
        user.ARK = await fetch(
          `https://ark-api.decent.land/v1/profile/arweave/${addr}`
          ).then((res) =>
          res.ok ? res.json() : Promise.reject("CONTRACT NOT FOUND!")
          );
          console.log("user:",user)
        // console.log("arweaveAccount:", arweaveAccountUser);
        //let address = addr;
        // const ark = await fetch(
        //   `https://ark-api.decent.land/v1/profile/arweave/${addr}`
        //   );
        //let user = await ark.json();
        //user = ans;


        
        // if (Object.entries(user).length === 0 ) {
        //   let checksumAddress = ethers.utils.getAddress(addr);
        //   const ethString = `https://ark-api.decent.land/v1/profile/evm/${checksumAddress}`;
        //   const eth = await fetch(ethString);
        //   const ens = await eth.json();
        //   user = ens.res;
        //   setUserContent(user);
        // } else {
        //   console.log("ans.res",user.res)
        //   setUserContent(user.res);
        // }
        setUserContent(user);
        
      } catch (e) {
        console.log(JSON.stringify(e));
      } finally {
        console.log("done");
        setIsSearching(false);
        setIsLoading(false);
      }
    })();
  }, [addr]);

  //let newCache = fetch("https://cache.permapages.app/aSMILD7cEJr93i7TAVzzMjtci_sGkXcWnqpDkG6UGcA").then((res) => res.json())

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  function getAddrByANS(ansName) {
    const ansHandle = ansAPI.find((holder) => holder.username === ansName);
    if (ansHandle) {
      return ansHandle.address;
    }
  }

  // async function getCache(){
  //   let newCache = await fetch("https://cache.permapages.app/aSMILD7cEJr93i7TAVzzMjtci_sGkXcWnqpDkG6UGcA").then((res) => res.json());
  //   return newCache;
  // }

  function onSubmit(event) {
    event.preventDefault();
    async function sanitizeAddr(text){
      console.log(text)
      //regular Arweave
      //ANS
      //ETH
      //ANS




    }
    //sanitizeAddr(input)
    setAddr(input);
    setUserContent([]);
    setIsSearching(true);
  }

  return (
    <>
      <div className="text-container acctViewTextContainer">
        <h2>Search Arweave Related Content</h2>
        <p>
          Enter an address by ANS, Arweave, or Eth identity to find the
          Arweave related content.
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

      <div className="inputBox">
        {console.log("rendering some component")}
      </div>
      {isSearching && (
        <Grid.Container gap={1} justify="center">
          <Loading size="xl" css={{ padding: "$24" }} color="success" />
        </Grid.Container>
      )}
      <div className="">
        {Object.entries(userContent).length !== 0 && addr && !isLoading && (
          <ArweaveAccount
            addr={addr}
            walletName={walletName}
            disconnectWallet={disconnectWallet}
          />
        )}
        {console.log("userContent")}
        {Object.entries(userContent).length !== 0 && addr && !isLoading && (
          <UseAns
            addr={addr}
            walletName={walletName}
            disconnectWallet={disconnectWallet}
          />
        )}
        {console.log("userContent:", userContent)}
        {userContent.length !== 0 && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARK.res.POAPS}
            contentType={"POAPS"}
            label="POAPS"
          />
        )}
        {userContent.length !== 0 && 
          <ProfileContentContainer
            contentObjects={userContent.ARK.res.STAMPS}
            contentType={"STAMPS"}
            label="STAMPS"
          />
        }
        {userContent.length !== 0 && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARK.res.ANFTS.permapages_img}
            contentType={"permapages_img"}
            label="permapages_img"
          />
        )}
        {userContent.length !== 0 && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARK.res.ANFTS.koii}
            contentType={"aNFTs"}
            label="koii"
          />
        )}
        
        

        {/* {userContent.length !== 0 && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARK.res.ERC_NFTS}
            contentType={"ERC_NFTS"}
            label="ERC_NFTS"
          />
        )} */}
      </div>
    </>
  );
}
export default AccountViewer;
