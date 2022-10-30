import { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import MainContext from "../../context";
import Login from "src/components/Login/Login";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import { ethers } from "ethers";
import UseAns from "src/components/ANSForAll";
import ANSdisplay from "src/components/ANSForAll/ANSdisplay";
import { Button, Grid, Loading, Text, Spacer, Row, Col } from "@nextui-org/react";
import { AiOutlineUpload } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export function Dashboard() {
  const { addr } = useContext(MainContext);
  const [userContent, setUserContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
      <Spacer y={1} />
      {addr && (
        <Row>
          <Col>
            <h4>Arweave Account</h4>
          </Col>
          <Col>
            <Button
              className="nav-link identity-link "
              onClick={() => navigate("/upload")}
              iconRight={<AiOutlineUpload size={18} />}
            >
             
                Create
             
            </Button>
          </Col>
        </Row>
      )}
      <Login />
      {addr && isLoading && (
        <>
          <p>Searching for content</p>
          <Loading />
        </>
      )}


      {addr && userContent?.ANS && !isLoading ? (
        <ANSdisplay content={userContent.ANS} />
      ) : addr && !isLoading ? (
        <UseAns addr={addr} />
      ) : null}

      {addr && userContent?.POAPS && !isLoading && (
        <ProfileContentContainer
          contentObjects={userContent.POAPS}
          contentType={"POAPS"}
          label="POAPS"
        />
      )}

      {addr && userContent?.STAMPS && !isLoading && (
        <ProfileContentContainer
          contentObjects={userContent.STAMPS}
          contentType={"STAMPS"}
          label="STAMPS"
        />
      )}

      {addr && userContent?.ANFTS?.permapages_img && !isLoading && (
        <ProfileContentContainer
          contentObjects={userContent.ANFTS.permapages_img}
          contentType={"permapages_img"}
          label="permapages_img"
        />
      )}
      {addr && userContent?.ANFTS?.koii && !isLoading && (
        <ProfileContentContainer
          contentObjects={userContent.ANFTS.koii}
          contentType={"aNFTs"}
          label="koii"
        />
      )}
      {addr && userContent?.ERC_NFTS && !isLoading && (
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
