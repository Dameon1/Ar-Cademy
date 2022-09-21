import { ethers } from "ethers";
import Account from "arweave-account";
import { useContext, useEffect, useState } from "react";

import MainContext from "../../context";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import "./accountViewer.css";
import ArweaveAccount from "src/components/ArweaveAccount";

export function AccountViewer() {
  const { walletName, disconnectWallet } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addr, setAddr] = useState();
  const [input, setInput] = useState();

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
      }
    })();
  }, [addr]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  function onSubmit(event) {
    event.preventDefault();
    setAddr(input);
    setIsLoading(!isLoading);
  }
  
  return (
    <>
      <div className="text-container">
        <h2>Search Arweave Related Content</h2>
        <p className="site-introduction">
          Enter an address to find the Arweave related content associated
          connected to it. Not all users have content to diplay or have created
          an account on the various network calls that are made here.
        </p>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Enter address"
            onChange={handleInput}
            required
            minLength="42"
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

      <div className="">
        {addr && !isLoading && (
          <ArweaveAccount
            addr={addr}
            walletName={walletName}
            disconnectWallet={disconnectWallet}
            ARK={"ARKAPI"}
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
