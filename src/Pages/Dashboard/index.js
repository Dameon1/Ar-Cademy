import { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import MainContext from "../../context";
import Login from "src/components/Login/Login";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import { ethers } from "ethers";
import { Loading } from "@nextui-org/react";
import UseAns from "src/components/ANSForAll";
import ANSdisplay from "src/components/ANSForAll/ANSdisplay";

export function Dashboard() {
  const { addr } = useContext(MainContext);
  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (addr) {
      async function update() {
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
        setIsLoading(false);
      }
      update();
    }
  }, [addr]);
  
  return (
    <div className="">
      <Login />
      {addr && isLoading &&
        <>
          <p>Searching for content</p>
         <Loading />
        </>
       }


        

      {(addr && userContent && !isLoading) ? (
        <ANSdisplay content={userContent.ANS} />
      ) : (addr  && !isLoading) ? <UseAns addr={addr}   /> : null }

      
       {(addr && userContent && !isLoading) && (
        <ProfileContentContainer
          contentObjects={userContent.POAPS}
          contentType={"POAPS"}
          label="POAPS"
        />
      )}

      {(addr && userContent && !isLoading) && (
        <ProfileContentContainer
          contentObjects={userContent.STAMPS}
          contentType={"STAMPS"}
          label="STAMPS"
        />
      )}

      {(addr && userContent && !isLoading) && (
        <ProfileContentContainer
          contentObjects={userContent.ANFTS.permapages_img}
          contentType={"permapages_img"}
          label="permapages_img"
        />
      )}
      {(addr && userContent && !isLoading) && (
        <ProfileContentContainer
          contentObjects={userContent.ANFTS.koii}
          contentType={"aNFTs"}
          label="koii"
        />
      )}
      {(addr && userContent && !isLoading) && (
        <ProfileContentContainer
          contentObjects={userContent.ERC_NFTS}
          contentType={"ERC_NFTS"}
          label="ERC_NFTS"
        />
      )} 
    </div>
  );
}
export default Dashboard;
