import { useContext, useEffect, useState } from "react";
import './dashboard.css';
//import { AMW } from '../../utils/api';
//import Card from "../../components/Cards";
import MainContext from '../../context';
import Login from "src/components/Login/Login";
import { getWeaveAggregator } from "../../api/WeaveAggregator";
import ProfileContentContainer from "src/components/ProfileContentContainer";

async function getData(network, option) {
  const data = await getWeaveAggregator(network, option);
  return data;
}

// let returnedSavesData = getData("arweave-saves", "zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE");
// let returnedArdriveData = getData("ardrive", "waGdO_7V0hUsm5v7lUFC-bT0tSXQG7g_K1s2bheistk");


export function Dashboard() {
  const { addr } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  
  useEffect(() => {
    if (addr) {
      async function update(){
        let data = await getData("koii", addr).then(data => data)
        setUserContent(data);
      }
      update()
    }
    console.log("addr", addr)
  }, [addr])
  

  return (
    <div className="dashboard">
      <Login />
      {addr && <ProfileContentContainer contentObjects={userContent} contentType={"NFTs"} label="koii"/>}
      {/* <PassportCard isArweaveWalletConnected={props.isArweaveWalletConnected} />
      <ContentVideoCards />
      <ContentSandboxCards />
      <ContentSandboxCards /> */}
    </div>
  );
}
export default Dashboard;
