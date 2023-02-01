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
import { useNavigate } from "react-router-dom";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import { VideoCard, MediaCard } from "../Cards";
import {
  Grid,
  Row,
  Text,
  Col,
  Loading,
  Container,
  Button,
  Spacer,
  Avatar,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

//import { take, takeLast } from "ramda";

export default function AtomicVideoPlayerContainer(props) {
  const { setState } = props;
  const [asset, setAsset] = useState(null);
  const [ownerVideos, setOwnerVideos] = useState([]);
  const [arcademyVideos, setArcademyVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authorObject, setAuthorObject] = useState(null);
  const [contractData, setContractData] = useState();
  const [ownerData, setOwnerData] = useState();
  const navigate = useNavigate();
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
  function getArcademyVideos(id) {
    let authorObject = Authors[id];
    let authorVideos;
    if (authorObject !== undefined) {
      authorVideos = authorObject.createdVideosByID
        .map((x) => Videos[x])
        .filter((x) => x.uid !== id);
    }
    return [authorVideos, authorObject];
  }

  useEffect(() => {
    async function data(id) {
      let assetData = await getAssetData(id);
      let assetContractData = await assetContractDetails(id);
      let profileData = await getProfile(assetData.owner);
      let ownerVideos = await getUserVideos(assetData.owner, "video", "");
      //let assetStampedCount = await getCount(id);
      //let rewards = await getRewards(id);
      //let ownersArray = Object.keys(assetContractData.state.balances);
      //let ownersAvatars = await getAllOwnersAvatar();
      let filteredOwnerVideos = ownerVideos[0].filter((x) => x.id !== id);
      let authorVideos = getArcademyVideos(assetData.owner);
      //setUrls(JSON.parse(assetData.externalLinks));
      setContractData(assetContractData);
      setAsset(assetData);
      setOwnerData(profileData);
      setOwnerVideos(filteredOwnerVideos);
      if (authorVideos[0] !== undefined) {
        setArcademyVideos(authorVideos[0]);
        setAuthorObject(authorVideos[1]);
      }
      // setArcademyVideos(authorVideos[0]);
      // setAuthorObject(authorVideos[1]);
      ///setAssetStampCount(assetStampedCount);
      //setRewards(rewards);
      //setOwnersAddressArray(ownersArray);
      setIsLoading(false);
    }
    data(itemId);
  }, [itemId, isLoading]);
  let cards = ownerVideos.map((video, index) => {
    return (
      <div className="videoThumbnails" key={index}>
        <Link
          key={video.uid}
          to={`/AtomicPlayground/${video.id}`}
          className="textNoDec"
          onClick={setState}
        >
          <AtomicVideoCards video={video} />
        </Link>
      </div>
    );
  });

  let authorCards = arcademyVideos.map((video, index) => {
    return (
      <div className="videoThumbnails" key={index}>
        <Link
          key={video.uid}
          to={`/playground/${video.uid}`}
          className="textNoDec"
          onClick={setState}
        >
          <MediaCard video={video} setState={setState} />
        </Link>
      </div>
    );
  });

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
            <div className="video-player">
              <video
                className="react-player"
                controls={true}
                width="100%"
                height="100%"
              >
                <source
                  src={`https://arweave.net/${asset.id}`}
                  type="video/mp4"
                />
              </video>
            </div>
            {/* <video controls >
              <source src={`https://arweave.net/${asset.id}`} type="video/mp4" />
            </video> */}

            <footer className="video-footer">
              <Row display="flex" justify="flex-start" align="center">
                <Link to={`/profile/${asset.owner}/${asset.owner}`}>
                  <Avatar
                    src={"https://arweave.net/" + ownerData.profile.avatar}
                    size="lg"
                    pointer="true"
                  />
                </Link>

                <Col>
                  <p className="pText">{asset.description}</p>
                </Col>
              </Row>
              <Spacer y={1} />
              <Row justify="center" align="space-evenly">
                {authorObject?.authorWebsite && (
                  <Col>
                    <a
                      href={`${authorObject.authorWebsite}`}
                      className="video-creator-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="pText">Website</p>
                    </a>
                  </Col>
                )}
                {authorObject?.authorLink && (
                  <Col>
                    <a
                      href={authorObject.authorLink}
                      target="_blank"
                      rel="noreferrer"
                      className="video-creator-link"
                    >
                      <p className="pText">{authorObject.username}</p>
                    </a>
                  </Col>
                )}

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
                <div className="hs">
                  {cards}
                  {authorCards}
                </div>
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
}
