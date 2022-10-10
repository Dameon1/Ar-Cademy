import { useContext, useEffect, useState } from "react";
import './dashboard.css';
import MainContext from '../../context';
import Login from "src/components/Login/Login";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import {ethers} from "ethers";

export function Dashboard() {
  const { addr } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (addr) {
      async function update() {
        let user;
        const res = await fetch(`https://ark-api.decent.land/v1/profile/arweave/${addr}`);
        const ans = await res.json()
        if(ans.res === undefined){
          let checksumAddress = ethers.utils.getAddress(addr) 
          const ethString = `https://ark-api.decent.land/v1/profile/evm/${checksumAddress}`;
          const eth = await fetch(ethString);
          const ens = await eth.json();
          user = ens.res
        } else {
          user = ans.res
        }
        setUserContent(user)
        setIsLoading(false);
      }
      update();
    }
  },[addr])

  return (
    <div className="">
      <Login />
      {isLoading && <div>Loading</div>}
      {console.log(userContent)}
      {addr  && !isLoading && <ProfileContentContainer contentObjects={userContent.POAPS} contentType={"POAPS"} label="POAPS" />}
      {Object.entries(userContent).length !== 0 && !isLoading && (
        <ProfileContentContainer
        contentObjects={userContent.STAMPS}
        contentType={"STAMPS"}
        label="STAMPS"
        />
        )}
        {addr  && !isLoading && <ProfileContentContainer contentObjects={userContent.ANFTS.permapages_img} contentType={"permapages_img"} label="permapages_img" />}
        {addr  && !isLoading && <ProfileContentContainer contentObjects={userContent.ANFTS.koii} contentType={"aNFTs"} label="koii" />}
        {addr  && !isLoading && <ProfileContentContainer contentObjects={userContent.ERC_NFTS} contentType={"ERC_NFTS"} label="ERC_NFTS" />}
    </div>
  );
}
export default Dashboard;