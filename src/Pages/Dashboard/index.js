import { useContext, useEffect, useState } from "react";
import './dashboard.css';
import { AMW } from '../../utils/api';
//import Card from "../../components/Cards";
import MainContext from '../../context';
import Login from "src/components/Login/Login";
import { getWeaveAggregator } from "../../api/WeaveAggregator";
import ProfileContentContainer from "../../components/ProfileContentContainer";
async function getData(network, option) {
  const data = await getWeaveAggregator(network, option);
  return data;
}
let returnedArdriveData = getData("ardrive", "waGdO_7V0hUsm5v7lUFC-bT0tSXQG7g_K1s2bheistk");



export function Dashboard() {
  const { addr } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  
  let returnedSavesData = getData("arweave-saves", addr);

  useEffect(async () => {
    if (!addr) {return};
    let data = await getData("koii", addr)
    console.log("data" , data);
    setUserContent(data);
  },[addr] )
  

  return (
    <div className="dashboard">
      <Login />
      <ProfileContentContainer contentObjects={userContent} contentType={"Videos"} label="koii" />
      
      {/* <PassportCard isArweaveWalletConnected={props.isArweaveWalletConnected} />
      <ContentVideoCards />
      <ContentSandboxCards />
      <ContentSandboxCards /> */}
    </div>
  );
}
export default Dashboard;
