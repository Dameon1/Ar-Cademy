import {
  Card,
  Grid,
  Row,
  Text,
  Col,
  Button,
  Container,
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
      "🚨🚨 NEW CONTENT 🚨🚨\n\n" +
        title.replace("#", "no ") +
        "\n🐘🐘🐘🐘🐘🐘🐘🐘🐘\n"
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
          <div
            className="playground-section"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <AtomicVideoPlayerContainer />
            <Container css={{ width: "240px", p: 0 }}>
                <Col wrap="wrap" align="center" justify="center">
                  <Row align="center" justify="center">
                    <h3>Asset Details</h3>
                  </Row>
                  <Spacer y={0.25} />

                  <Row justify="space-between" align="center">
                    <Col justify="space-around" align="center">
                      <h4>STAMPS Earned</h4>
                      <p>{assetStampCount}</p>
                    </Col>
                    <Col justify="space-around" align="center">
                      <h4>$TAMP Rewards</h4>
                      <p>{Number(atomicToStamp(rewards)).toFixed(4)}</p>
                    </Col>
                    <Col justify="space-around" align="center">
                      <h4>
                        Cost in {toProperCase(contractData.state.currencyUsed)}
                      </h4>
                      <p>{contractData.state.uploadCost.slice(0, 6)}</p>
                    </Col>
                  </Row>
                  <Spacer y={0.5} />

                  <Row align="center" justify="center">
                    <h3>URLs:</h3>
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
                  <Spacer y={0.5} />
                  <Row align="center" justify="center">
                    <h3>Holders:</h3>
                  </Row>
                  <Row>
                    <Grid xs={12} css={{backgroundColor:"white", borderRadius: "10px"}}>
                      <Avatar.Group textColor="white" count={ownersAddressArray.length} css={{color:"green"}}>
                        {ownersAddressArray.map((address, index) => (
                          <>
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
                </Col>
              
            </Container>
          </div>

          {/* <Row>
          <AtomicVideoPlayerContainer />
          </Row> */}
        </section>
      )}
    </main>
  );
}
