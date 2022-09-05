import { useContext, useEffect, useState } from "react";
import './dashboard.css';
//import { AMW } from '../../utils/api';
//import Card from "../../components/Cards";
import MainContext from '../../context';
import Login from "src/components/Login/Login";
import { getWeaveAggregator } from "../../api/WeaveAggregator";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import {ethers} from "ethers";
// ethers.js をインポート





async function getData(network, option) {
  const data = await getWeaveAggregator(network, option);
  return data;
}



// let returnedSavesData = getData("arweave-saves", "zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE");


export function Dashboard() {
  const { addr } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log("dashboard mounted")
    if (addr) {
      let checksumAddress = ethers.utils.getAddress(addr)
      async function update() {
        const res = await fetch(`https://ark-api.decent.land/v1/profile/arweave/${addr}`);
        const ans = await res.json();

        const ethString = `https://ark-api.decent.land/v1/profile/evm/${checksumAddress}`;
        const eth = await fetch(ethString);
        const ens = await eth.json()

        console.log("eth:", eth)
        console.log("ans:", ans.res)
        console.log("ens:", ens.res)

        let user;
        ans.res === undefined ? user = ens.res : user = ans.res
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
      {addr  && !isLoading && <ProfileContentContainer contentObjects={userContent.ANFTS.koii} contentType={"aNFTs"} label="koii" />}
      {addr  && !isLoading && <ProfileContentContainer contentObjects={userContent.MORALIS_NFTS} contentType={"MORALIS_NFTS"} label="MORALIS_NFTS" />}

    </div>
  );
}
export default Dashboard;