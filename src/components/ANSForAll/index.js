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
} from "@nextui-org/react";

import { AvatarS } from "../../static/styles/Profile";
import MainContext from "../../context";

import { icons } from "../../static";

function UseAns({ addr, forDashboard }) {
  const [ansProfile, setAnsProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const { theme } = useContext(MainContext);

  useEffect(() => {
    (async () => {
      try {
        if (addr.length !== 43) {
          return;
        }

        const res = await fetch(
          `https://ans-testnet.herokuapp.com/profile/${addr}`
        );
        const ans = await res.json();

        if (Object.keys(ans).length > 0) {
          setAnsProfile(ans);
        }
      } catch (e) {
        setHasFailed(JSON.stringify(e));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [addr]);

  return (
    <div>
      {isLoading ? (
        <Grid.Container gap={1} justify="center">
          <Loading size="xl" />
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
          <div style={{ padding: "5px" }}>
            <AvatarS
              src={`https://arweave.net/${ansProfile.avatar}`}
              sx={{ width: 100, height: 100 }}
            />

            {ansProfile?.currentLabel && <h2>{ansProfile.currentLabel}</h2>}

            <p className="pText">{ansProfile.bio}</p>
            <Row wrap="wrap" align="center" justify="space-around">
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
                        size={25}
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
                      size={25}
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
                    <FaGlobe className="socialImageLinks" size={25} />
                  </Link>
                </Tooltip>
              )}
            </Row>
            <Spacer y={1} />
            <Row wrap="wrap" align="center" justify="space-around">
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
                      height={30}
                      width={30}
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
                      width={30}
                      height={30}
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
                      height={30}
                      width={30}
                      src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"
                      alt="Eth logo"
                      quality={50}
                    />
                  </Link>
                </Tooltip>
              )}
            </Row>

            <Spacer y={1} />
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
                <p>{ansProfile.currentLabel}.ar.page</p>
              </Button>
            </a>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <p className="pText">No Account Found{` 🙂`}</p>
            </div>
            <Spacer y={1} />
            {/* {forDashboard && (
                <Button
                  auto
                  // onClick={() => setModalIsOpen(true)}
                  // iconRight={<FiEdit size={18} />}
                  className="identity-link buttonText"
                >
                  Edit Profile
                </Button>
              )} */}
          </div>
        </>
      )}
    </div>
  );
}

export default UseAns;
