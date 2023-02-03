import {
  Card,
  Grid,
  Row,
  Text,
  Col,
  Button,
  Avatar,
  Loading,
  Spacer,
} from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import { getAssetData, assetDetails } from "../../lib/imgLib/asset.js";
import { atomicToStamp } from "../../lib/imgLib/utils.js";
import { getCount, getRewards } from "../../lib/imgLib/stamp.js";
import { getProfile } from "../../lib/imgLib/account.js";
//import { take, takeLast } from "ramda";
import MainContext from "../../context";
import { Link } from "react-router-dom";
import AtomicVideoPlayerContainer from "../../components/AtomicVideoPlayerContainer";
//import { imgCache, profile } from "../store.js";

export default function AssetManagement() {
  const { addr } = useContext(MainContext);
  const [asset, setAsset] = useState();
  const [ownerData, setOwnerData] = useState();
  //const [count, setCount] = useState();
  const [rewards, setRewards] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [contractData, setContractData] = useState();
  const [ownersAddressArray, setOwnersAddressArray] = useState([]);
  const [assetStampCount, setAssetStampCount] = useState();
  const [urls, setUrls] = useState([]);
  let module = window.location.hash.split("/");
  let itemId = module[module.length - 1];
  //const account = new Account();

  // id;
  // let imageMsg = "";
  // let src = "https://placehold.co/400";
  // let stampDlg = false;
  // let errorDlg = false;
  // let errorMsg = "";
  // let showConnect = false;
  // let showHelp = false;
  // let tryingToStamp = false;

  useEffect(() => {
    async function data(id) {
      let assetData = await getAssetData(itemId);
      let assetContractData = await assetDetails(itemId, addr);
      let profileData = await getProfile(assetData.owner);
      let assetStampedCount = await getCount(id);
      let rewards = await getRewards(id);
      let ownersArray = Object.keys(assetContractData.state.balances);
      //let ownersAvatars = await getAllOwnersAvatar();
      console.log("assetData", assetData);
      console.log("assetContractData", assetContractData);
      setUrls(JSON.parse(assetData.externalLinks));
      setContractData(assetContractData);
      setAsset(assetData);
      setOwnerData(profileData);
      setAssetStampCount(assetStampedCount);
      setRewards(rewards);
      setOwnersAddressArray(ownersArray);
      setIsLoading(false);
    }
    data(itemId);
  }, [addr, itemId]);

  function tweetLink(title, id) {
    return `https://twitter.com/intent/tweet?text=${encodeURI(
      "🚨🚨 NEW CONTENT 🚨🚨\n\n" + title.replace("#", "no ") + "\n🐘🐘🐘🐘🐘🐘🐘🐘🐘\n"
    )}&url=https://arcademy.arweave.dev/%23/AtomicPlayground/${itemId}`;
  }
  const toProperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  };

  // function connected() {
  //   if (tryingToStamp) {
  //     handleStamp();
  //   }
  // }

  return (
    <main>
      {isLoading && <Loading />}
      {!isLoading && (
        <section>
          <Grid.Container gap={2} justify="flex-wrap">
            <Row>
              <Col>
                <Row>
                  <Card css={{ w: "100%", h: "400px" }}>
                    <Card.Header
                      css={{ position: "absolute", zIndex: 1, top: 5 }}
                    ></Card.Header>
                    <Card.Body css={{ p: 0 }}>
                      {console.log(asset)}
                      {asset.type === "video" ? (
                        <video
                          objectFit="contain"
                          width="100%"
                          type="videos"
                          controls
                          src={`https://arweave.net/${itemId}`}
                        />
                      ) : (
                        <Card.Image
                          src={`https://arweave.net/${itemId}`}
                          objectFit="contain"
                          width="100%"
                          height="100%"
                          alt="Relaxing app background"
                        />
                      )}
                    </Card.Body>
                    <Card.Footer
                      isBlurred
                      css={{
                        position: "absolute",
                        bgBlur: "#0f111466",
                        borderTop: "$borderWeights$light solid $gray800",
                        bottom: 0,
                        zIndex: 1,
                      }}
                    >
                      <Row>
                        <Col>
                          <Row align="flex-end">
                            <Col span={3}>
                              <Link
                                //to={`/profile/${contentObject.authorObject.addr}/${contentObject.authorObject.uid}`}
                                to={`/Profile/${contractData.state.emergencyHaltWallet}/${contractData.state.emergencyHaltWallet}`}
                              >
                                <Card.Image
                                  src={`https://arweave.net/${ownerData.profile.avatar}`}
                                  css={{ bg: "black", br: "50%" }}
                                  height={40}
                                  width={40}
                                  alt={asset.title}
                                />
                              </Link>
                            </Col>
                            <Col>
                              <Row justify="flex-start" gap={1}>
                                <Text color="#d1d1d1" size={12}>
                                  {asset.title}
                                </Text>
                              </Row>
                            </Col>

                            <Row justify="flex-end">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                className="textNoDec"
                                href={tweetLink(asset.title, itemId)}
                                v="btn btn-outline btn-sm rounded-none font-normal"
                              >
                                <Button
                                  flat
                                  auto
                                  rounded
                                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
                                >
                                  <Text
                                    css={{ color: "inherit" }}
                                    size={12}
                                    weight="bold"
                                    transform="uppercase"
                                  >
                                    Share
                                  </Text>
                                </Button>
                              </a>
                            </Row>
                          </Row>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Row>
                <Row>
                  <h3>Holders:</h3>

                  <Grid xs={12}>
                    <Avatar.Group count={ownersAddressArray.length}>
                      {ownersAddressArray.map((address, index) => (
                        <>
                          {console.log(address)}
                          <Link
                            key={index}
                            to={`/Profile/${address}/${address}`}
                          >
                            <Avatar
                              text={address.slice(0, 4)}
                              size="lg"
                              pointer
                              color="gradient"
                              stacked
                            />
                          </Link>
                        </>
                      ))}
                    </Avatar.Group>
                  </Grid>
                </Row>
                {addr && (
                  <>
                    <Row align="center" justify="center">
                      <h3>Your Equity</h3>
                    </Row>

                    <Row>
                      <Col>
                        <p>Percentage Owned</p>
                        <p>{contractData.percent} %</p>
                        <p>Total owned: {contractData.state.balances[addr]}</p>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>

              <Col>
                <Row align="center" justify="center">
                  <h3>Asset Description</h3>
                </Row>
                <Row align="center" justify="center">
                  <p className="pText">{asset.description}</p>
                </Row>
                <Spacer y={1} />
                <Row justify="center">
                  <Col>
                    <h4>STAMPS Earned</h4>
                    <p className="pText">{assetStampCount}</p>
                  </Col>
                  <Col>
                    <h4>$TAMP Rewards</h4>
                    <p className="pText">
                      {Number(atomicToStamp(rewards)).toFixed(4)}
                    </p>
                  </Col>
                  <Col>
                    <h4>
                      Cost in {toProperCase(contractData.state.currencyUsed)}
                    </h4>
                    <p className="pText">
                      {contractData.state.uploadCost.slice(0, 6)}
                    </p>
                  </Col>
                </Row>
                {urls &&
                  urls.links.map((object, i) => (
                    <Row align="center" justify="center" key={i}>
                      <p key={object.label}>
                        {toProperCase(object.label)}:{"  "}
                        <a
                          href={object.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {object.url}
                        </a>
                      </p>
                    </Row>
                  ))}
              </Col>
            </Row>
          </Grid.Container>
          {/* <Row>
          <AtomicVideoPlayerContainer />
          </Row> */}
        </section>
      )}
    </main>
  );
}
