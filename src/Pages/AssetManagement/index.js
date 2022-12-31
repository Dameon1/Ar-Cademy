import {
  Card,
  Grid,
  Row,
  Text,
  Col,
  Button,
  Avatar,
  Loading,
} from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import { getAssetData, assetDetails } from "../../lib/imgLib/asset.js";
import { atomicToStamp } from "../../lib/imgLib/utils.js";
import MainContext from "../../context";
//import { take, takeLast } from "ramda";
import { Link } from "react-router-dom";
//import { imgCache, profile } from "../store.js";
import { getCount, getRewards } from "../../lib/imgLib/stamp.js";
import { getProfile } from "../../lib/imgLib/account.js";
import { defaultCacheOptions, WarpFactory } from "warp-contracts/web";

export default function AssetManagement() {
  const { addr } = useContext(MainContext);
  const [assetData, setAssetData] = useState();
  const [contractData, setContractData] = useState();
  const [ownerData, setOwnerData] = useState();
  const [ownersAddressArray, setOwnersAddressArray] = useState([]);
  const [contractState, setContractState] = useState({});

  const [asset, setAsset] = useState();
  //const [count, setCount] = useState();
  const [rewards, setRewards] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [assetStampCount, setAssetStampCount] = useState();
  let module = new URL(window.location.href).pathname.split("/");
  let itemId = module[module.length - 1];
  //const account = new Account();
  // const warp = WarpFactory.forMainnet({
  //   ...defaultCacheOptions,
  //   inMemory: true,
  // });
  // id;
  let imageMsg = "";
  // let src = "https://placehold.co/400";
  // let stampDlg = false;
  // let errorDlg = false;
  // let errorMsg = "";
  // let showConnect = false;
  // let showHelp = false;
  // let tryingToStamp = false;
  const [name, setName] = useState("");

  const contractId = "AXQySVEJO3BCY8rUfCZwM5dNWc0ns6_9GNnyLKd_27Y";

  // const getContract = async (id) => {
  //   const wallet = await warp.arweave.wallets.generate();
  //   const contract = await warp.contract(id).connect(wallet);
  //   return contract;
  // };
  const getState = async (contract) => {
    const { cachedValue } = await contract.readState();
    const state = cachedValue.state;
    return state;
  };

  // const getContractAndState = async (id) => {
  //   const contract = await getContract(id);
  //   const state = await getState(contract);
  //   setContractState((prevState) => ({ ...prevState, state }));
  //   console.log(state);
  // };

  // useEffect(() => {
  //   // async function fetchContractData() {
  //   //   const contract = await getContract();
  //   //   const state = await getState(contract);
  //   //   setContractState((prevState) => ({ ...prevState, state }));
  //   //   console.log(state)
  //   // }
  //   // fetchContractData();
  //   async function data() {
  //     //const contract = await getContract(itemId);
  //     //const contractState = await getState(contract);
  //     //setAssetData(getContractAndState(id));
  //     //const contract = await getContract();
  //     //const state = await getState(contract);
  //     let assetData = await getAssetData(itemId);
  //     //let assetContractData = await assetDetails(itemId, addr);
  //     //let profileData = await getProfile(assetData.owner);
  //     //let assetStampedCount = await getCount(id);
  //     //let rewards = await getRewards(id);
  //     //let ownersArray = Object.keys(assetContractData.state.balances);
  //     //let ownersAvatars = await getAllOwnersAvatar();
  //     //console.log(assetData, contractState);
  //     //setAssetData(assetData);
  //     //(contractState);
  //     //((prevState) => ({ ...prevState, state }));
  //     //((prevState) => ({ ...prevState, state }));
  //     //setAsset(assetData);
  //     //setOwnerData(profileData);
  //     //setAssetStampCount(assetStampedCount);
  //     //setRewards(rewards);
  //     //setOwnersAddressArray(ownersArray);
  //     setIsLoading(false);
  //   }
  //   //data();
  // });

  

  useEffect(() => {
    let module = new URL(window.location.href).pathname.split("/");
    let itemId = module[module.length - 1];
    const warp = WarpFactory.forMainnet({
      ...defaultCacheOptions,
      inMemory: true,
    });

    (async () => {
      try {
        let wallet = await warp.arweave.wallets.generate();
        let contract = await warp.contract(itemId).connect(wallet);
        let contractState = await getState(contract);
        let assetData = await getAssetData(itemId);
        let profileData = await getProfile(contractState.emergencyHaltWallet);
        let ownersArray = Object.keys(contractState.balances);
        let assetStampedCount = await getCount(itemId);
        let rewards = await getRewards(itemId);
        setAssetData(assetData);
        setContractState(contractState);
        setOwnerData(profileData);
        setOwnersAddressArray(ownersArray);
        setAssetStampCount(assetStampedCount);
        setRewards(rewards);

        console.log("contractState:", contractState);
        console.log("assetData:", assetData);
        console.log("profileData:", profileData);
      } catch (e) {
        alert(JSON.stringify(e));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const account = new Account();
  //         const user = await account.get(addr);
  //         if (user) {
  //           setProfileData(user.profile);
  //           setProfileTxid(user.txid);
  //           setBalance(await AMW.getBalance());
  //         }
  //       } catch (e) {
  //         setHasFailed(JSON.stringify(e));
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     })();
  //   }, [addr]);

  // async function getAllOwnersAvatar() {
  //   if (ownersAddressArray.length < 1) {
  //     return;
  //   }
  //   // const res =  account.get(addr);
  //   // async function profilePicture(id) {
  //   //   let profilePicture = Promise.resolve(getProfilePicture(id));
  //   //   return profilePicture;
  //   // }
  //   let data = ownersAddressArray
  //     .map(async (item) => {
  //       const res = await account.get(item);
  //       if (res !== null) {
  //         if (res.profile !== null) {
  //           if (res.profile.avatar !== undefined) {
  //             console.log(res.profile.avatar);
  //           }
  //         }
  //       } else {
  //         return "assets";
  //       }
  //       //   let picture = profilePicture(item);
  //       //   let newPicture =  picture;
  //       //   return newPicture;
  //       //      profile(x){
  //       //     }
  //       //     return profile(x)
  //       // })
  //     })
  //     .filter((word) => word !== "assets");
  //   return data;
  // }
  //    let ownersImages = Object.keys(contractData.state.balances).map((x) => {
  //     let profile = getAllOwnersAvatar(x)
  //     console.log(profile)
  //     return (<p>{x}</p>)
  //   })
  // let constructionDlg = false;
  // let msg = "";

  // function loadImage(url) {
  //   return new Promise((resolve) => {
  //     fetch(url)
  //       // Extract as a blob
  //       .then((resp) => resp.blob())
  //       .then((blob) => {
  //         console.log("got blob");
  //         // Image element to load the image into. Could be passed as a variable if you already have an element to load into.
  //         const img = document.createElement("img");
  //         // Use blob as object url
  //         //img.src = URL.createObjectURL(blob);

  //         // wait for image to be loaded before resolving the promise
  //         // img.onload = () => {
  //         //   console.log("loaded");
  //         //   resolve(img.src);
  //         // };
  //         resolve(URL.createObjectURL(blob));
  //       });
  //   });
  // }

  // async function handleStamp() {
  //   if (!window.arweaveWallet) {
  //     tryingToStamp = true;
  //     showConnect = true;
  //     return;
  //   }
  //   tryingToStamp = false;
  //   stampDlg = true;
  //   const addr = await window.arweaveWallet.getActiveAddress();
  //   console.log(addr);
  //   isVouched(addr)
  //     .then((res) =>
  //       res
  //         ? stamp(id)
  //         : Promise.reject(
  //             new Error(
  //               "Could not stamp asset, make sure you are Verified by a Vouch Service, <a target='_blank' className='link' href='https://vouchdao.xyz'>https://vouchdao.xyz</a>"
  //             )
  //           )
  //     )
  //     .then((res) => {
  //       setAssetStampCount(getCount(id));
  //       stampDlg = false;
  //     })
  //     .catch((e) => {
  //       stampDlg = false;
  //       errorMsg = e.message;
  //       errorDlg = true;
  //     });
  // }

  function tweetLink(title, id) {
    return `https://twitter.com/intent/tweet?text=${encodeURI(
      "🪧 STAMP\n\n" + title.replace("#", "no ") + "\n\n🐘"
    )}&url=https://img.arweave.dev/%23/show/${id}`;
  }

  // function connected() {
  //   if (tryingToStamp) {
  //     handleStamp();
  //   }
  // }

  //let assetCount = getCount(id);
  //let assetData = getAssetData(id);

  return (
    <main>
      {console.log(assetData, contractState)}
      {isLoading && <Loading />}
      {!isLoading && (
        <section className="hero min-h-screen bg-base-100">
          <Grid.Container gap={2} justify="flex-wrap">
            <Row>
              <Col>
                <Row>
                  <Card css={{ w: "100%", h: "400px" }}>
                    <Card.Header
                      css={{ position: "absolute", zIndex: 1, top: 5 }}
                    ></Card.Header>
                    <Card.Body css={{ p: 0 }}>
                      {console.log(assetData)}
                      {assetData.type === "video/mp4" ? (
                        <video
                          objectFit="contain"
                          width="100%"
                          type="videos"
                          controls
                          src={`https://arweave.net/${itemId}`}
                        />
                      ) : (
                        <Card.Image
                          src={`https://arweave.net/${assetData.videoImage}`}
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
                                to={`/Profile/${contractState.emergencyHaltWallet}/${contractState.emergencyHaltWallet}`}
                              >
                                <Card.Image
                                  src={`https://arweave.net/${ownerData.profile.avatar}`}
                                  css={{ bg: "black", br: "50%" }}
                                  height={40}
                                  width={40}
                                  alt={"asset.title"}
                                />
                              </Link>
                            </Col>
                            <Col>
                              <Row justify="flex-start" gap={1}>
                                <Text color="#d1d1d1" size={12}>
                                  {assetData.title}
                                </Text>
                              </Row>
                            </Col>

                            <Row justify="flex-end">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                className="textNoDec"
                                href={tweetLink(assetData.title)}
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
                    <Avatar.Group count={ownersAddressArray.length - 4}>
                      {ownersAddressArray
                        .slice(0, 4)
                        .map((ownerAddr, index) => (
                          <>
                            <Link
                              to={`/Profile/${ownerAddr}/${ownerAddr}`}
                              key={index}
                            >
                              <Avatar
                                size="lg"
                                pointer
                                text={ownerAddr}
                                color="gradient"
                                stacked
                              />
                            </Link>
                          </>
                        ))}
                    </Avatar.Group>
                  </Grid>
                </Row>
                <Row>
                  <h3>Asset Description</h3>
                </Row>
                <Row>
                  <p c>{assetData.description}</p>
                </Row>

                <Row justify="center">
                  <Col>
                    <div>
                      <h4>STAMPS Earned</h4>
                    </div>

                    {assetStampCount && (
                      <div>
                        <p>{assetStampCount}</p>
                      </div>
                    )}
                  </Col>
                  <Col>
                    <div>
                      <h4>$TAMP Rewards</h4>
                    </div>
                    <div>
                      {rewards && (
                        <div>
                          <p> {Number(atomicToStamp(rewards)).toFixed(5)}</p>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <div>
                        <h4>Cost to Upload</h4>
                      </div>
                      <div>
                        <div>
                          <p>{contractState.currencyUsed}</p>
                        </div>
                        <div>
                          <p>{contractState.uploadCost.slice(0, 6)}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col>
                <h2>Your Equity</h2>
                <Row>
                  {addr ? (
                    <Col>
                      <p>Percentage Owned</p>
                      <p>{contractState.balances[addr] / 100} %</p>
                      <p>Total owned: {contractState.balances[addr]}</p>
                    </Col>
                  ) : null}
                </Row>
              </Col>
            </Row>
          </Grid.Container>
        </section>
      )}
    </main>
  );
}
