import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import ARKdisplay from "src/components/ANSForAll/ARKdisplay";
import UseAns from "src/components/ANSForAll";
import "./profile.css";
import { Card } from "../../components/Cards";
import ArProfile from "src/components/ArProfile";
import { Loading, Container, Row, Col } from "@nextui-org/react";

export default function Profile() {
  let urlArray = new URL(window.location.href).pathname.split("/");
  let profileId = urlArray[urlArray.length - 1];
  let addr = urlArray[urlArray.length - 2];

  //TEMPORARY FIX FOR SAM WILLIAMS
  if (addr === "vLRHFqCw1uHu75xqB4fCDW-QxpkpJxBtFD9g4QYUbfw") {
    profileId = 8;
  }

  let videoIds;
  if (Authors[profileId] !== undefined) {
    videoIds = Authors[profileId].createdVideosByID;
  } else {
    videoIds = [];
  }

  let videoObjects;
  if (videoIds.length > 0) {
    videoObjects = videoIds.map((id) => Videos[id]);
  } else {
    videoObjects = [];
  }

  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (addr.length === 0) return;
        let user;
        const arArk = await fetch(
          `https://ark-core.decent.land/v2/profile/arweave/${addr}`
        );
        const ark = await arArk.json();

        user = await ark.res;
        setUserContent(user);
        setIsSearching(false);
        setIsLoading(false);
      } catch (e) {
        console.log(JSON.stringify(e));
      } finally {
        console.log("finally");
      }
    })();
  }, [addr, isSearching]);

  let cards = videoObjects.map((content) => {
    return (
      <Link
        key={content.uid}
        to={`/playground/${content.uid}`}
        className="cardLinks"
      >
        <Card content={content} />
      </Link>
    );
  });

  return (
    <>
      <h1>Profile</h1>

      <div className="">
        {isLoading && (
          <>
            <p>Searching for content</p>
            <Loading />
          </>
        )}
        {addr && !isLoading && !isSearching && (
          <Container
            className="gradient-border"
            style={{ padding: "5px", maxWidth: "640px" }}
          >
            <Row>
              <Col align="center">
                <h3>ArProfile:</h3>
                <ArProfile addr={addr} />
              </Col>
              <Col align="center">
                {console.log(userContent)}
                <h3>ANS Profile:</h3>
                {addr && userContent?.ARWEAVE?.ANS && !isSearching ? (
                  <ARKdisplay
                    content={userContent}
                    evmAddr={userContent.primary_address}
                  />
                ) : addr && !isSearching ? (
                  <UseAns addr={addr} />
                ) : (
                  <Loading />
                )}
              </Col>
            </Row>
          </Container>
        )}
        {console.log(userContent)}
        {videoObjects.length > 0 && (
          <div>
            <h1>Videos</h1>
            <div className="contentScrollContainer">
              <div className="hs">{cards}</div>
            </div>
          </div>
        )}

        {addr && userContent?.primary_address && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.EVM[userContent.primary_address]?.POAPS}
            contentType={"POAPS"}
            label="POAPS"
          />
        )}

        {addr && userContent?.NFTS && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.NFTS}
            contentType="NFTS"
            label="NEAR NFTS"
          />
        )}
        {addr && userContent?.ARWEAVE?.STAMPS && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARWEAVE.STAMPS}
            contentType="STAMPS"
            label="Stamped Assets"
          />
        )}
        {addr && userContent?.ARWEAVE?.ANFTS?.permapages_img && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARWEAVE.ANFTS.permapages_img}
            contentType="permapages_img"
            label="Created Atomic Assets"
          />
        )}
        {addr && userContent?.ARWEAVE?.ANFTS?.koii && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ARWEAVE.ANFTS.koii}
            contentType="koii"
            label="Koii NFTS"
          />
        )}
        {addr &&
          userContent?.EVM?.[userContent.primary_address]?.ERC_NFTS &&
          !isLoading && (
            <ProfileContentContainer
              contentObjects={
                userContent.EVM[userContent.primary_address].ERC_NFTS
              }
              contentType="ERC_NFTS"
              label="ERC_NFTS"
            />
          )}
      </div>
    </>
  );
}
