import { useState, useEffect, useContext } from "react";
//import { assetDetails } from "../../lib/imgLib/asset.js";
import { getAssetData } from "../../Queries/AssetQueries/assetData";
import { assetContractDetails } from "../../Queries/AssetQueries/assetContract";
import { getUserVideos } from "../../Queries/UserQueries";
import AtomicVideoCards from "../../components/Cards/AtomicVideoCards";
// import { atomicToStamp } from "../../lib/imgLib/utils.js";
// import { getCount, getRewards } from "../../lib/imgLib/stamp.js";
import { getProfile } from "../../lib/imgLib/account.js";
// import MediaCards  from "../../components/Cards/MediaCards";
// import MainContext from "../../context";
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

export default function AtomicVideoPlayerContainer(props) {
  const {setState} = props;
  const [asset, setAsset] = useState(null);
  const [ownerVideos, setOwnerVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contractData, setContractData] = useState();
  const [ownerData, setOwnerData] = useState();
  //const [urls, setUrls] = useState([]);
  //const [videoID, setViedoID] = useState();
  //const [loading, setLoading] = useState(true);
  //const [count, setCount] = useState();
  //const [rewards, setRewards] = useState();
  //const [ownersAddressArray, setOwnersAddressArray] = useState([]);
  //const [assetStampCount, setAssetStampCount] = useState();
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
      let assetContractData = await assetContractDetails(id);
      let profileData = await getProfile(assetData.owner);
      let ownerVideos = await getUserVideos(assetData.owner, "video", "");
      console.log("userVideos", ownerVideos);
      //let assetStampedCount = await getCount(id);
      //let rewards = await getRewards(id);
      //let ownersArray = Object.keys(assetContractData.state.balances);
      //let ownersAvatars = await getAllOwnersAvatar();
      console.log("assetData", assetData);
      console.log("assetContractData", assetContractData);
      let authorVideos = ownerVideos[0].filter((x) => x.id !== id);
      console.log("authorVideos", authorVideos);
      //setUrls(JSON.parse(assetData.externalLinks));
      setContractData(assetContractData);
      setAsset(assetData);
      setOwnerData(profileData);
      setOwnerVideos(authorVideos);
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

//   function setState() {
//     setIsLoading(true);
//   }

  let cards = ownerVideos.map((video, index) => {
    return (
      <div className="videoThumbnails" key={index}>
        <AtomicVideoCards video={video} setState={setState} />
      </div>
    );
  });

  //let videoId = new URL(window.location.href).pathname.split('/').at(-1);

  //let sandboxSrc = Videos[videoId].sandboxLinks[Videos[videoId].sandboxLinks.preferred];
  //let links = Videos[videoId].sandboxLinks;
  return (
    <>
      <div className="video-player-container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <header className="video-header">
              <h3 className="video-title">{asset.title}</h3>
            </header>
            {console.log("asset", asset, itemId)}
            <div className="video-player">
            <video
              className="react-player"
              controls={true}
              width="100%"
              height="100%"
            >
              <source src={`https://arweave.net/${asset.id}`} type="video/mp4" />
            </video>
          </div>
            {/* <video controls >
              <source src={`https://arweave.net/${asset.id}`} type="video/mp4" />
            </video> */}
            

            <footer className="video-footer">
              <p className="pText">{asset.description}</p>
              <Spacer y={1} />
              <Row justify="center" align="space-evenly">
                {/* <Col>
              <a
                href={`${contentObject.authorObject.authorWebsite}`}
                className="video-creator-link"
                target="_blank"
                rel="noreferrer"
              >
                <p className="pText">Website</p>
              </a>
            </Col>
            <Col>
              <a
                href={contentObject.authorObject.authorLink}
                target="_blank"
                rel="noreferrer"
                className="video-creator-link"
              >
                <p className="pText">{contentObject.authorObject.username}</p>
              </a>
            </Col> */}
                <Col>
                  <Link
                    to={`/profile/${asset.owner}/${asset.owner}`}
                    className="video-creator-link"
                  >
                    <p className="pText">Profile</p>
                  </Link>
                </Col>
              </Row>
              <Spacer y={1} />
              <h3>Videos</h3>
              {/* {ownerVideos && <AtomicVideoCards images={ownerVideos} />} */}
              <div className="contentScrollContainer">
                <div className="hs">{cards}</div>
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
}
