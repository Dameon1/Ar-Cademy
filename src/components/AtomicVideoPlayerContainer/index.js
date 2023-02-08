import { useState, useEffect } from "react";
import { getAssetData } from "../../Queries/AssetQueries/assetData";
import { getUserVideos } from "../../Queries/UserQueries";
import AtomicVideoCards from "../../components/Cards/AtomicVideoCards";
import { getProfile } from "../../lib/imgLib/account.js";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import { MediaCard } from "../Cards";
import Stamp from "../Stamp";
import { isVouched } from "../../lib/imgLib/stamp";
import { MdVerified } from "react-icons/md";
import { FcShare } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import {
  Row,
  Text,
  Loading,
  Button,
  Spacer,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function AtomicVideoPlayerContainer(props) {
  const { setState } = props;
  const [asset, setAsset] = useState(null);
  const [ownerVideos, setOwnerVideos] = useState([]);
  const [arcademyVideos, setArcademyVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ownerData, setOwnerData] = useState();
  const [vouched, setVouched] = useState(false);

  let module = window.location.hash.split("/");
  let itemId = module[module.length - 1];

  function tweetLink(title, id) {
    return `https://twitter.com/intent/tweet?text=${encodeURI(
      `🚨 New Content by ${ownerData.profile.name}🚨\n\n` +
        title.replace("#", "no ") +
        "\n🐘🐘🐘🐘🐘🐘🐘🐘🐘 @Ar_Cademy\n"
    )}&url=https://arcademy.arweave.dev/%23/AtomicPlayground/${itemId}`;
  }

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
      let profileData = await getProfile(assetData.owner);
      let ownerVideos = await getUserVideos(assetData.owner, "video", "");
      let filteredOwnerVideos = ownerVideos[0].filter((x) => x.id !== id);
      let authorVideos = getArcademyVideos(assetData.owner);
      let getVouched = await isVouched(assetData.owner);
      setVouched(getVouched);
      setAsset(assetData);
      setOwnerData(profileData);
      setOwnerVideos(filteredOwnerVideos);
      if (authorVideos[0] !== undefined) {
        setArcademyVideos(authorVideos[0]);
      }
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
              <h4 className="video-title">{asset.title}</h4>
            </header>
            <div className="video-player">
              <video
                className="react-player"
                controls={true}
                width="100%"
                height="100%"
              >
                <source
                  src={`https://ar-io.net/${asset.id}`}
                  type="video/mp4"
                />
              </video>
            </div>

            <footer className="video-footer">
              <Row display="flex" justify="flex-start" align="flex-end">
                <Link to={`/profile/${asset.owner}/${asset.owner}`}>
                  <Avatar
                    src={"https://ar-io.net/" + ownerData.profile.avatar}
                    size="lg"
                    pointer="true"
                  />
                </Link>
                <Spacer x={0.5} />
                <Row align="flex-end">
                  <Text
                    css={{
                      color: "white",
                      fontWeight: "$semibold",
                      fontSize: "$xl",
                    }}
                  >
                    {ownerData.profile.name}
                  </Text>
                  <Spacer x={0.25} />
                  {vouched && (
                    <div style={{ marginBottom: "5px" }}>
                      <MdVerified
                        className="socialImageLinks"
                        size={15}
                        aria-hidden="true"
                        color="#1d9bf0"
                      />
                    </div>
                  )}
                </Row>

                <Row justify="flex-end">
                  <Stamp txId={itemId} />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="textNoDec"
                    href={tweetLink(asset.title, itemId)}
                    v="btn btn-outline btn-sm rounded-none font-normal"
                  >
                    <Tooltip
                      content={
                        <FaTwitter
                          color="#1d9bf0"
                          placement="bottom"
                          size={18}
                        />
                      }
                      css={{ bg: "white", p: 10, fontSize: 18 }}
                      hideArrow
                      placement="bottom"
                      offset={2}
                    >
                      <Button
                        flat
                        auto
                        rounded
                        css={{
                          color: "white",
                          bg: "white",
                          m: 6,
                          p: 6,
                          fontSize: 20,
                          zIndex: 1,
                        }}
                      >
                        <FcShare />
                      </Button>
                    </Tooltip>
                  </a>
                </Row>
              </Row>
              <Spacer y={0.5} />
              <Row css={{ borderRadius: "5px", backgroundColor: "#717c86" }}>
                <p
                  style={{
                    letterSpacing: "0.5px",
                    fontFamily: "Work Sans",
                    fontSize: "12px",
                    textAlign: "left",
                    padding: "5px",
                  }}
                >
                  {asset.description}
                </p>
              </Row>
              <Spacer y={1} />

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