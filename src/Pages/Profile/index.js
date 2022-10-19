import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import PassportCard from "../../components/PassportCard";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import ANSdisplay from "src/components/ANSForAll/ANSdisplay";
import UseAns from "src/components/ANSForAll";
import "./profile.css";
import { Card } from "../../components/Cards";
import { ethers } from "ethers";
import ArweaveAccount from "src/components/ArweaveAccount";
import {Grid, Loading} from "@nextui-org/react";

export default function Profile() {
  // let profileId = new URL(window.location.href).pathname.split("/")[-1];
  // let profileObject = Authors[profileId];
  // let videoIds = Authors[profileId].createdVideosByID;
  // let videoObjects = videoIds.map((videoId) => Videos[videoId]);
  let urlArray = new URL(window.location.href).pathname.split("/");
  let addr = urlArray[urlArray.length - 1];
  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //const [addr, setAddr] = useState("");
  const [input, setInput] = useState();
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (addr.length === 0) return;
        let user;
        const arArk = await fetch(
          `https://ark-api.decent.land/v1/profile/arweave/${addr}`
        );
        const ark = await arArk.json();
        if (ark.res === undefined) {
          if (addr.split(".")[0].length === 42) {
            let checksumAddress = ethers.utils.getAddress(addr);
            const ethString = `https://ark-api.decent.land/v1/profile/evm/${checksumAddress}`;
            const ethArk = await fetch(ethString);
            const evmArk = await ethArk.json();
            user = evmArk.res;
          }
        } else {
          user = ark.res;
        }
        setUserContent(user);
        setIsSearching(false);
      } catch (e) {
        console.log(JSON.stringify(e));
      } finally {
        console.log("done");
        setIsLoading(false);
      }
    })();
  }, [addr]);
  // let cards = videoObjects.map((content) => {
  //   return (
  //     <Link
  //       key={content.uid}
  //       to={`/playground/${content.uid}`}
  //       className="cardLinks"
  //     >
  //       <Card content={content} />
  //     </Link>
  //   );
  // });

  return (
    <>
      <h1>Profile</h1>
      {/* <div className="passportContainer">
        <PassportCard profileObject={profileObject} />
      </div> */}

      {/* <div>
        <h1>Videos</h1>
        <div className="contentScrollContainer">
          <div className="hs">{cards}</div>
        </div>
      </div> */}
      <div className="">
        {addr && !isLoading && !isSearching && (
          <ArweaveAccount addr={addr}/>
        )}

        {isLoading && ( 
          <>
            <p>Searching for content</p>
            <Loading />
          </>
        )}

        {addr && userContent && !isSearching 
          ? (<ANSdisplay content={userContent.ANS} />) 
          : addr && !isSearching 
          ? (<UseAns addr={addr} />) 
          : null
        }

        {addr && userContent && !isSearching && (
          <ProfileContentContainer contentObjects={userContent.POAPS} contentType={"POAPS"} label="POAPS" />
        )}

        {addr && userContent && !isSearching && (
          <ProfileContentContainer contentObjects={userContent.STAMPS} contentType={"STAMPS"} label="STAMPS" />
        )}

        {addr && userContent && !isSearching && (
          <ProfileContentContainer contentObjects={userContent.ANFTS.permapages_img} contentType={"permapages_img"} label="permapages_img"/>
        )}

        {addr && userContent && !isSearching && (
          <ProfileContentContainer contentObjects={userContent.ANFTS.koii} contentType={"aNFTs"} label="koii"/>
        )}

        {addr && userContent && !isSearching && (
          <ProfileContentContainer contentObjects={userContent.ERC_NFTS} contentType={"ERC_NFTS"} label="ERC_NFTS"/>
        )}
      </div>
    </>
  );
}
