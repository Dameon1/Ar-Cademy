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
 

export function Dashboard() {
  const { addr } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    if (addr) {
      setIsLoading(true);
      async function update(){
        let koiiData = await getWeaveAggregator("koii", addr)
        //let returnedArdriveData = await getData("ardrive", addr);
        console.log(typeof addr)
        setUserContent(koiiData);
      }
      update()
      setIsLoading(false);
    }
  }, [addr])
  

  return (
    <div className="dashboard">
      <Login />
      {isLoading && <div>Loading...</div>}
      {!isLoading && addr && <ProfileContentContainer contentObjects={userContent} contentType={"NFTs"} label="koii"/>}
      
      {/* <PassportCard isArweaveWalletConnected={props.isArweaveWalletConnected} />
      <ContentVideoCards />
      <ContentSandboxCards />
      <ContentSandboxCards /> */}
    </div>
  );
}
export default Dashboard;