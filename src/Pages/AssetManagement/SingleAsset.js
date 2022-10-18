import { Card, Grid, Row, Text, Col, Button, Avatar } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getAssetData } from "../../lib/imgLib/asset.js";
import { atomicToStamp } from "../../lib/imgLib/utils.js";

import { take, takeLast } from "ramda";

//import { imgCache, profile } from "../store.js";
import {
  isVouched,
  stamp,
  getCount,
  getRewards,
} from "../../lib/imgLib/stamp.js";
import { getProfile } from "../../lib/imgLib/account.js";

export default function SingleAsset() {
  const [asset, setAsset] = useState();
  const [ownerData, setOwnerData] = useState();
  const [count, setCount] = useState();
  const [rewards, setRewards] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let module = new URL(window.location.href).pathname.split("/");
  let itemId = module[module.length - 1];

  console.log(itemId);
  let id;
  let src = "https://placehold.co/400";
  let imageMsg = "";
  let stampDlg = false;
  let errorDlg = false;
  let errorMsg = "";
  let showConnect = false;
  let showHelp = false;
  let tryingToStamp = false;

  useEffect(() => {
    async function data(id) {
      let assetData = await getAssetData(itemId);
      let profileData = await getProfile(assetData.owner);
      let assetCount = await getCount(id);
      let rewards = await getRewards(id);
      setAsset(assetData);
      setOwnerData(profileData);
      setCount(assetCount);
      setRewards(rewards);
      setIsLoading(false);
      console.log(assetCount, assetData, profileData);
    }
    data(itemId);
  }, [itemId]);

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

  let constructionDlg = false;
  let msg = "";

  function loadImage(url) {
    return new Promise((resolve) => {
      fetch(url)
        // Extract as a blob
        .then((resp) => resp.blob())
        .then((blob) => {
          console.log("got blob");
          // Image element to load the image into. Could be passed as a variable if you already have an element to load into.
          const img = document.createElement("img");
          // Use blob as object url
          //img.src = URL.createObjectURL(blob);

          // wait for image to be loaded before resolving the promise
          // img.onload = () => {
          //   console.log("loaded");
          //   resolve(img.src);
          // };
          resolve(URL.createObjectURL(blob));
        });
    });
  }

  async function handleStamp() {
    if (!window.arweaveWallet) {
      tryingToStamp = true;
      showConnect = true;
      return;
    }
    tryingToStamp = false;
    stampDlg = true;
    const addr = await window.arweaveWallet.getActiveAddress();
    console.log(addr);
    isVouched(addr)
      .then((res) =>
        res
          ? stamp(id)
          : Promise.reject(
              new Error(
                "Could not stamp asset, make sure you are Verified by a Vouch Service, <a target='_blank' className='link' href='https://vouchdao.xyz'>https://vouchdao.xyz</a>"
              )
            )
      )
      .then((res) => {
        assetCount = getCount(id);
        stampDlg = false;
      })
      .catch((e) => {
        stampDlg = false;
        errorMsg = e.message;
        errorDlg = true;
      });
  }

  function tweetLink(title, id) {
    return `https://twitter.com/intent/tweet?text=${encodeURI(
      "🪧 STAMP\n\n" + title.replace("#", "no ") + "\n\n🐘"
    )}&url=https://img.arweave.dev/%23/show/${id}`;
  }

  function connected() {
    if (tryingToStamp) {
      handleStamp();
    }
  }

  let assetCount = getCount(id);
  let assetData = getAssetData(id);

  return (
    <main>
      {!isLoading && (
        <section className="hero min-h-screen bg-base-100">
          <Grid.Container gap={2} justify="flex-start">
            <Row>
              <Col>
              <Row>
                <Card css={{ w: "100%", h: "400px" }}>
                  <Card.Header
                    css={{ position: "absolute", zIndex: 1, top: 5 }}
                  ></Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={`https://arweave.net/${itemId}`}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      alt="Relaxing app background"
                    />
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
                        <Row>
                          <Col span={3}>
                            <Card.Image
                              src={`https://arweave.net/${ownerData.profile.avatar}`}
                              css={{ bg: "black", br: "50%" }}
                              height={40}
                              width={40}
                              alt={asset.title}
                            />
                          </Col>
                          <Col>
                            <Text color="#d1d1d1" size={12}>
                              {asset.title}
                            </Text>
                            <Text color="#d1d1d1" size={12}>
                              {asset.description}
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
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
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
                </Row>
             <Row>
                <h1 className="text-3xl">Asset Data</h1>
                <p className="text-xl">{asset.description}</p>
                {asset.topics.length > 0 && (
                  <p className="mt-4 text-sm">
                    Topics: {asset.topics.join(", ")}
                  </p>
                )}
                <div className="mt-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="mb-2 uppercase">Holders</div>
                      {ownerData && (
                        <div className="flex items-center space-x-2">
                          <Avatar
                            src={`https://arweave.net/${ownerData.profile.avatar}`}
                            size="lg"
                          />

                          {ownerData.profile.handleName === "" ? (
                            <div>{asset.owner}</div>
                          ) : (
                            <div>{ownerData.profile.handleName}</div>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-2 uppercase">Timestamp</div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between">
                    <div className="mb-4 flex flex-col">
                      <div>STAMPS Earned</div>
                      <div className="flex space-x-4 items-center">
                        <img
                          className="h-[35px] w-[35px]"
                          src="../../assets/stamp2.svg"
                          alt="stamp"
                        />
                        {count && <div>{count}</div>}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <div className="uppercase">Rewards</div>
                        <div className="flex space-x-4">
                          <div className="font-bold">$TAMP</div>
                          {rewards && (
                            <div>
                              {Number(atomicToStamp(rewards)).toFixed(5)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden">
                    Link:{" "}
                    <a className="link" href="https://arweave.net/{id}">
                      SOME RANDOM LINK TO IDK
                    </a>
                  </div>
                  <div className="hidden md:block">
                    Link:{" "}
                    <a className="link" href="https://arweave.net/{id}">
                      {id}
                    </a>
                  </div>
                </div>
                </Row>
                

                <div className="md:w-1/2 px-0 mx-0 grid place-items-center">
                  {imageMsg !== "" && <p>{imageMsg}</p>}
                </div>
              </Col>

              <Col className="hero-content w-[350px] md:w-full p-0 m-0 flex-col md:flex-row md:space-x-4">
                <h1 className="text-3xl">Your Equity</h1>
                <Row>
                  <Col>
                    <p>Percentage Owned</p>
                    <p>(PERCENT)</p>
                  </Col>
                  <Col>
                    <p>Transfer Ownership %</p>
                    <button>Transfer</button>
                  </Col>
                </Row>

                <p>Buy Order</p>
                <p>Sell Order</p>
                <div className="w-[325px] md:w-1/2 px-0 mx-0 md:ml-8">
                  <div className="mb-4 px-0 mx-0 flex items-start justify-between">
                    <h1 className="text-3xl">Active Orders</h1>
                    <Row>
                      <Col>
                        <p>Sell Orders</p>
                        <p>"No Current Orders"</p>
                      </Col>
                      <Col>
                        <p>Buy Orders</p>
                        <button>"No Current Orders"</button>
                      </Col>
                    </Row>
                    <h1 className="text-3xl">Recent Transactions</h1>
                    <Row>
                      <Col>
                        <p>Sell Orders</p>
                        <p>"No Current Orders"</p>
                      </Col>
                      <Col>
                        <p>Buy Orders</p>
                        <button>"No Current Orders"</button>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="md:hidden">
                      Link:{" "}
                      <a className="link" href="https://arweave.net/{id}">
                        SOME RANDOM LINK TO IDK
                      </a>
                    </div>
                    <div className="hidden md:block">
                      Link:{" "}
                      <a className="link" href="https://arweave.net/{id}">
                        {id}
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid.Container>
        </section>
      )}
    </main>
  );
}
