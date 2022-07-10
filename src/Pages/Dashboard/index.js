import { useContext, useEffect, useState } from "react";
import './dashboard.css';
//import { AMW } from '../../utils/api';
//import Card from "../../components/Cards";
import MainContext from '../../context';
import Login from "src/components/Login/Login";
import { getWeaveAggregator } from "../../api/WeaveAggregator";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import { KoiiCard } from "src/components/Cards";

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
      async function update() {
        let koiiData = await getWeaveAggregator("koii", addr)
        //let returnedArdriveData = await getData("ardrive", addr);
        console.log(koiiData);
        console.log(typeof addr)
        setUserContent(koiiData);
      }
      update()
      setIsLoading(false);
    }
  }, [addr])

      // async function update() {
      //   if(addr) {
      //     let koiiData = await getWeaveAggregator("koii", addr)
      //     //let returnedArdriveData = await getData("ardrive", addr);
      //     console.log(koiiData);
      //     console.log(typeof addr)
      //     setUserContent(koiiData);
      //   }
      // }
      // update()

  let koiiCards = userContent.map((content, i) => {
    return (
      <div key={i} className="cardLinks">
        <a href={`https://koi.rocks/content-detail/${content.id}`} target="_blank"
          rel="noopener noreferrer" className="textNoDec" >
          <KoiiCard key={content.uid} content={content} />
        </a>
      </div>)
  })


  return (
    <div className="dashboard">
      <Login />
      {isLoading && <div>Loading...</div>}
      {!isLoading && addr && <ProfileContentContainer contentObjects={userContent} contentType={"a-NFTs"} label="koii" />}
      {/* <div className="contentScrollContainer">
        <h1>NFTs:</h1>
        <div className="hs">
          {koiiCards}
        </div>
      </div > */}

      
      {/* <PassportCard isArweaveWalletConnected={props.isArweaveWalletConnected} />
      <ContentVideoCards />
      <ContentSandboxCards />
      <ContentSandboxCards /> */}
    </div>
  );
}
export default Dashboard;