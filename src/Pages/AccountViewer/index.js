import { useContext, useEffect, useState } from "react";
//import { AMW } from '../../utils/api';
//import Card from "../../components/Cards";
import MainContext from "../../context";
import { Link } from "react-router-dom"
import Login from "src/components/Login/Login";
//import { getWeaveAggregator } from "../../api/WeaveAggregator";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import { ethers } from "ethers";
import UserProfile from "../../components/UserProfile/UserProfile";
import './accountViewer.css';

export function AccountViewer() {
  const addr = new URL(window.location.href).pathname.split("/").at(-1);
  console.log(addr);
  const { walletName, disconnectWallet } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("")


  useEffect(() => {
    setIsLoading(true);
    console.log("dashboard mounted");
    if (addr) {
      async function update() {
        let user;
        const res = await fetch(
          `https://ark-api.decent.land/v1/profile/arweave/${addr}`
        );
        const ans = await res.json();
        if (ans.res === undefined) {
          let checksumAddress = ethers.utils.getAddress(addr);
          const ethString = `https://ark-api.decent.land/v1/profile/evm/${checksumAddress}`;
          const eth = await fetch(ethString);
          const ens = await eth.json();
          user = ens.res;
        } else {
          user = ans.res;
        }
        setUserContent(user);
        setIsLoading(false);
      }
      update();
    }
  }, [addr]);

  function updateAddrSearch(event) {
    setUrl(event.target.value);
  }

  return (
    <>
      <div className="inputBox">
        <label for="name">Enter address:</label>
        <input
          onChange={updateAddrSearch}
          type="text"
          id="name"
          name="name"
          required
          minlength="8"
          maxlength="46"
          size="48"
        >
        </input>
      <Link to={`/AccountViewer/${url}`}><button>Go to Account</button></Link>
      <p>Current Addr: {addr}</p>
      </div>
          
      <div className="">
        <UserProfile
          addr={addr}
          walletName={walletName}
          disconnectWallet={disconnectWallet}
        />
        {isLoading && <div>Loading</div>}
        {addr && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.POAPS}
            contentType={"POAPS"}
            label="POAPS"
          />
        )}
        {addr && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ANFTS.koii}
            contentType={"aNFTs"}
            label="koii"
          />
        )}
        {addr && !isLoading && (
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
