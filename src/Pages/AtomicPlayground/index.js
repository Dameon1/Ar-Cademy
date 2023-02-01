import AtomicVideoPlayerContainer from "../../components/AtomicVideoPlayerContainer";

import AtomicSandbox from "../../components/AtomicSandbox";
import VideoPlayerContainer from "../../components/VideoPlayerContainer";
import { Videos } from "../../Videos";
import { useState, useEffect, useContext } from "react";
//import { assetDetails } from "../../lib/imgLib/asset.js";
import { getAssetData } from "../../Queries/AssetQueries/assetData";
import { assetContractDetails } from "../../Queries/AssetQueries/assetContract";
import { getUserVideos } from "../../Queries/UserQueries";
import AtomicVideoCards from "../../components/Cards/AtomicVideoCards";
import { atomicToStamp } from "../../lib/imgLib/utils.js";
import { getCount, getRewards } from "../../lib/imgLib/stamp.js";
import { getProfile } from "../../lib/imgLib/account.js";
import VideoCard from "../../components/Cards/VideoCard";
import MainContext from "../../context";
import {
  Grid,
  Row,
  Text,
  Col,
  Loading,
  Container,
  Button,
  Spacer,
} from "@nextui-org/react";
import VideoPlayer from "../../components/VideoPlayer";
import { Link } from "react-router-dom";
//import { take, takeLast } from "ramda";

export default function AtomicPlayground() {
  const [videoID, setViedoID] = useState();
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState(null);
  const [ownerVideos, setOwnerVideos] = useState([]);
  const [ownerData, setOwnerData] = useState();
  //const [count, setCount] = useState();
  const [rewards, setRewards] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [contractData, setContractData] = useState();
  const [ownersAddressArray, setOwnersAddressArray] = useState([]);
  const [assetStampCount, setAssetStampCount] = useState();
  const [urls, setUrls] = useState([]);
  let module = new URL(window.location.href).pathname.split("/");
  let itemId = module[module.length - 1];

  // async function runFilterQuery(addr, type, filtertag) {
  //   if (addr) {
  //     let newImages = await getImages(addr, type, filtertag);
  //     console.log(newImages);
  //     setImages(newImages);
  //   }
  // }

  useEffect(() => {
    async function data(id) {
      let assetData = await getAssetData(id);
      //let assetContractData = await assetContractDetails(id);
      //let profileData = await getProfile(assetData.owner);
      //let ownerVideos = await getUserVideos(assetData.owner, "video", "");
      //console.log("userVideos", ownerVideos);
      //let assetStampedCount = await getCount(id);
      //let rewards = await getRewards(id);
      //let ownersArray = Object.keys(assetContractData.state.balances);
      //let ownersAvatars = await getAllOwnersAvatar();
      //console.log("assetData", assetData);
      //console.log("assetContractData", assetContractData);
      //let authorVideos = ownerVideos[0].filter((x) => x.id !== id);
      //console.log("authorVideos", authorVideos);
      setUrls(JSON.parse(assetData.externalLinks));
      //setContractData(assetContractData);
      //setAsset(assetData);
      //setOwnerData(profileData);
      //setOwnerVideos(authorVideos);
      ///setAssetStampCount(assetStampedCount);
      //setRewards(rewards);
      //setOwnersAddressArray(ownersArray);
      setIsLoading(false);
    }
    data(itemId);
  }, [itemId, isLoading]);
  // useEffect(() => {
  //   console.log("Reloaded")
  //   if(loading){setLoading(false)}

  // }, [loading])

  function setState() {
    setIsLoading(true);
  }

  //let videoId = new URL(window.location.href).pathname.split('/').at(-1);

  //let sandboxSrc = Videos[videoId].sandboxLinks[Videos[videoId].sandboxLinks.preferred];
  //let links = Videos[videoId].sandboxLinks;
  return (
    <>
      {isLoading ? null : (
        <section>
          <div className="playground-section">
            <AtomicVideoPlayerContainer setState={setState} />
            <AtomicSandbox
              title="sandbox"
              sandboxContent={urls.links[0]}
              sandboxLinks={urls.links}
            />
          </div>
        </section>
      )}
    </>
  );
}
