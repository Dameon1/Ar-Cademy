import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ThemeSwitch from "../ThemeSwitch";
import MainContext from "src/context";
import image from "../../favicon.ico";
import { myBar, myRewards, myCode } from "../../lib/balances/balances";
import { atomicToStamp, atomicToBar } from "../../lib/balances/utils.js";

export default function Navigation() {
  const { addr, disconnectWallet, userData } = useContext(MainContext);
  const [userBalances, setUserBalances] = useState();
  const [avatar, setAvatar] = useState(image);
  const navigate = useNavigate();

  // let { ANS, ARK, ArProfile } = userData;
  // console.log("HEADER ACCESS TO",ANS,ARK,ArProfile)
  const collapseItems = [
    { value: "Home", page: "." },
    { value: "Dashboard", page: "Dashboard" },
    { value: "Search", page: "AccountViewer" },
    { value: "Testpage", page: "Testpage" },
  ];

  useEffect(() => {
    (async () => {
      try {
        console.log("Reload Triggered:", addr, userData);
        setAvatar(image);
        setUserBalances(null)
        if (userData) {
          let user = {};
          console.log("getting bar");
          user.bar = await myBar(addr);
          console.log("getting rewards");
          user.stamp = await myRewards(addr);
          console.log("getting code");
          user.code = await myCode(addr);
          console.log(userData);
          if (userData !== null) {
            let { ANS, ARK, ArProfile } = userData;
            ARK?.ANS?.avatar
              ? setAvatar(`https://arweave.net/${ARK.ANS.avatar}`)
              : ANS?.avatar
              ? setAvatar(`https://arweave.net/${ANS.avatar}`)
              : ArProfile?.avatar
              ? setAvatar(`https://arweave.net/${ArProfile.avatar}`)
              : setAvatar(image);
          }
          console.log("loading balances and avatar1", userData);
          setUserBalances(user);
        }
        console.log("loading balances and avatar2", userData);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("done");
      }
    })();
  }, [addr, userData]);

  return (
    <Navbar
      containerCss={{ backgroundColor: "#717C86" }}
      variant="sticky"
      maxWidth={"fluid"}
      disableBlur="true"
      justify="flex-end"
      css={{
        "@xsMax": {
          w: "100%",
          jc: "space-between",
        },
      }}
    >
      <Navbar.Toggle showIn="sm" />
      <Navbar.Collapse showIn="lg">
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <Link to={`/${item.page}`} className="navigationCollapseLinks">
              {item.value}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      <Navbar.Content hideIn="sm" variant="highlight" justify="flex-end">
        <Link to="/" className="navigationLinks">
          <img src={image} alt="Winston" />
        </Link>
        <Link to="/Dashboard" className="navigationLinks">
          Dashboard
        </Link>
        <Link to="/AccountViewer" className="navigationLinks">
          Search
        </Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          "@xsMax": {
            w: "100%",
            jc: "flex-end",
          },
        }}
      >
        <Navbar.Brand
          css={{
            "@md": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <h1 className="site-logo">
            <span className="dark">AR</span>
            <span className="light">cademy</span>
          </h1>
        </Navbar.Brand>
        <Navbar.Item>
          <ThemeSwitch />
        </Navbar.Item>
        <Navbar.Item>
          <Dropdown placement="bottom-right">
            <Dropdown.Trigger>
              <Avatar bordered size="xl" src={avatar ? avatar : null} />
            </Dropdown.Trigger>

            <Dropdown.Menu aria-label="User menu actions" color="secondary">
              <Dropdown.Item
                key="profile"
                css={{ height: "$18" }}
                color="success"
                textValue="disconnect"
              >
                {addr ? (
                  <>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      YourName.eth.ar.lens
                    </Text>
                  </>
                ) : (
                  <Text
                    b
                    color="success"
                    css={{ d: "flex" }}
                    onClick={() => navigate("/Dashboard")}
                  >
                    Connect
                  </Text>
                )}
              </Dropdown.Item>

              {addr && userBalances && (
                <Dropdown.Item key="balances" withDivider textValue="balances">
                  BALANCES
                </Dropdown.Item>
              )}
              {addr && userBalances && (
                <Dropdown.Item key="$bAR" withDivider textValue="number of Bar">
                  $bAR: {Number(atomicToBar(userBalances.bar)).toFixed(2)}
                </Dropdown.Item>
              )}
              {addr && userBalances && (
                <Dropdown.Item key="$code" textValue="number of Code">
                  $Code: {userBalances.code}
                </Dropdown.Item>
              )}
              {addr && userBalances && (
                <Dropdown.Item key="$Stamp" textValue="number of Stamp">
                  $Stamp: {Number(atomicToStamp(userBalances.stamp)).toFixed(2)}
                </Dropdown.Item>
              )}

              {addr && userBalances && (
                <Dropdown.Item
                  key="logout"
                  withDivider
                  color="error"
                  textValue="disconnect"
                >
                  <Text color="error" onClick={disconnectWallet}>
                    Disconnect
                  </Text>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
        {/* {addr ?
          <Button auto onClick={disconnectWallet} className="identity-link signOutLink" icon={<AiOutlinePoweroff size={18} />} color="">Logout</Button>
          : <Link to="/identity" className="identity-link">
            {"Identity"}
          </Link>
          } */}
      </Navbar.Content>
    </Navbar>
  );
}
