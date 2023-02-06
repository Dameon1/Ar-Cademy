import { useEffect, useState, useContext } from "react";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";
import {
  Button,
  Grid,
  Loading,
  Text,
  Spacer,
  Row,
  Tooltip,
  Link,
  Col,
} from "@nextui-org/react";

import { AvatarS } from "../../static/styles/Profile";
import MainContext from "../../context";
import { isVouched } from "../../lib/imgLib/stamp";
import { MdVerified } from "react-icons/md";
import { icons } from "../../static";

function UseAns({ addr, forDashboard }) {
  const [ansProfile, setAnsProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const { theme, userData } = useContext(MainContext);
  const [vouched, setVouched] = useState(false);

  useEffect(() => {
    let getVouched = isVouched(addr);
    setVouched(getVouched);
    (async () => {
      try {
        if (addr.length !== 43) {
          console.log("bad addr for ans search");
          return;
        }
        if (forDashboard && userData?.ANS?.user) {
          return setAnsProfile(userData.ANS);
        }
        const res = await fetch(
          `https://ans-stats.decent.land/profile/${addr}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        const ans = await res.json();
        if (Object.keys(ans).length > 0) {
          setAnsProfile(ans);
        }
      } catch (e) {
        console.log("error", e);
        //setAnsProfile({});
        //setHasFailed(JSON.stringify(e));
      }
      setIsLoading(false);
    })();
  }, [addr, forDashboard, userData]);

  return (
    <div>
      {isLoading ? (
        <Grid.Container gap={1} justify="center">
          <Loading />
        </Grid.Container>
      ) : hasFailed ? (
        <>
          <Spacer y={3} />
          <Grid.Container gap={1} justify="center">
            <Text color="error">Something wrong happened :(</Text>
          </Grid.Container>
          <Spacer y={2} />
          <Grid.Container gap={1} justify="center">
            <Button
              css={{
                color: "black",
                border: "2px solid #008c9e",
                fontSize: "0.75em",
                padding: "0.3em",
                backgroundColor: "white",
                transition: "all 0.2s ease-in-out",
              }}
              color="secondary"
              onPress={() => setIsLoading(true)}
              className="button buttonText"
            >
              Retry
            </Button>
          </Grid.Container>
          <Spacer y={3} />
        </>
      ) : ansProfile ? (
        <>
          <Row align="center" justify="center">
            {ansProfile?.currentLabel && <h3>{ansProfile.currentLabel}</h3>}
            <Col css={{ width: "20px" }}>
              {vouched && (
                <MdVerified
                  className="socialImageLinks"
                  size={15}
                  aria-hidden="true"
                  color="#1d9bf0"
                />
              )}
            </Col>
          </Row>
          <Row align="center" justify="center">
            <AvatarS
              src={`https://arweave.net/${ansProfile.avatar}`}
              sx={{ width: 90, height: 90 }}
            />
          </Row>
          <Spacer y={0.5} />
          <Row
            wrap="wrap"
            align="center"
            justify="space-around"
            css={{ maxWidth: "200px" }}
          >
            {ansProfile?.links?.twitter && (
              <>
                <Tooltip content={`${ansProfile.links.twitter}`}>
                  <Link
                    href={`https://twitter.com/${ansProfile.links.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter
                      className="socialImageLinks"
                      size={20}
                      aria-hidden="true"
                    />
                  </Link>
                </Tooltip>
              </>
            )}
            {ansProfile?.links?.github && (
              <Tooltip content={`${ansProfile.links.github}`}>
                <Link
                  href={`https://github.com/${ansProfile.links.github}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-hidden="true"
                >
                  <FaGithub
                    href={`https://github.com/${ansProfile.links.github}`}
                    size={20}
                    className="socialImageLinks"
                  />
                </Link>
              </Tooltip>
            )}
            {ansProfile?.links?.customUrl && (
              <Tooltip content={`${ansProfile.links.customUrl}`}>
                <Link
                  href={`${ansProfile.links.customUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-hidden="true"
                >
                  <FaGlobe className="socialImageLinks" size={20} />
                </Link>
              </Tooltip>
            )}
          </Row>
          <Spacer y={0.5} />
          <Row
            wrap="wrap"
            align="center"
            justify="space-around"
            css={{ maxWidth: "200px" }}
          >
            {ansProfile?.LENS_HANDLES && (
              <Tooltip
                content={`${ansProfile.LENS_HANDLES[0]?.replace("@", "")}`}
              >
                <Link
                  href={`https://lenster.xyz/u/${ansProfile.LENS_HANDLES[0]?.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-hidden="true"
                >
                  <img
                    height={20}
                    width={20}
                    className="socialImageLinks"
                    src="https://raw.githubusercontent.com/lens-protocol/brand-kit/main/Logo/SVG/LENS%20LOGO_%20copy_Icon%20Only.svg"
                    alt="Lens logo"
                  />
                </Link>
              </Tooltip>
            )}
            {ansProfile?.currentLabel && (
              <Tooltip content={`${ansProfile.currentLabel}`}>
                <Link
                  href={`https://${ansProfile.currentLabel}.ar.page`}
                  target="_blank"
                >
                  <img
                    width={20}
                    height={20}
                    className="socialImageLinks"
                    src={
                      !theme
                        ? icons.arweaveWebWallet.light
                        : icons.arweaveWebWallet.dark
                    }
                    alt="Arweave logo"
                    quality={50}
                  />
                </Link>
              </Tooltip>
            )}
            {ansProfile?.ENS && (
              <Tooltip content={`${ansProfile.ENS}`}>
                <Link
                  href={`https://etherscan.io/enslookup-search?search=${ansProfile.ENS}`}
                  target="_blank"
                >
                  <img
                    height={20}
                    width={20}
                    src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"
                    alt="Eth logo"
                    quality={50}
                  />
                </Link>
              </Tooltip>
            )}
          </Row>
          <Spacer y={0.5} />
          <Row justify="center">
            <p
              style={{
                letterSpacing: "0.5px",
                fontFamily: "Work Sans",
                fontSize: "16px",
              }}
            >
              {ansProfile.bio}
            </p>
          </Row>
          <Spacer y={0.25} />
          <Row justify="center" align="center">
            <a
              href={`https://${ansProfile.currentLabel}.ar.page`}
              target="_blank"
              rel="noreferrer"
              className="textNoDec"
            >
              <Button
                css={{
                  color: "black",
                  border: "2px solid #008c9e",
                  fontSize: "0.75em",
                  padding: "0.3em",
                  backgroundColor: "white",
                  transition: "all 0.2s ease-in-out",
                }}
                className="button buttonText"
              >
                <p
                  style={{
                    letterSpacing: "0.5px",
                    fontFamily: "Work Sans",
                    fontSize: "16px",
                  }}
                >
                  {ansProfile.currentLabel}.ar.page
                </p>
              </Button>
            </a>
          </Row>
        </>
      ) : (
        <Col
          css={{
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row justify="center">
            <p
              style={{
                letterSpacing: "0.5px",
                fontFamily: "Work Sans",
                fontSize: "16px",
              }}
            >
              No Account Found
            </p>
          </Row>
          <Row justify="center" align="center">{` 🙂`}</Row>

          <Spacer y={1} />
          {/* {props.forDashboard && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://arweave.net/Zxz_DkB7ZVbHAWRJsy4_6o6q6Bu2DZGuOf9DphguWvQ?nocache=1672780622672"
                  >
                    <Button
                      auto
                      css={{
                        color: "black",
                        border: "2px solid #008c9e",
                        fontSize: "0.75em",
                        padding: "0.3em",
                        backgroundColor: "white",
                        transition: "all 0.2s ease-in-out",
                      }}
                      className="button buttonText"
                      iconRight={<AiOutlineUpload size={18} />}
                    >
                      <p className="pText">Create an ArProfile</p>
                    </Button>
                  </a>
                )} */}
        </Col>
      )}
    </div>
  );
}

export default UseAns;
