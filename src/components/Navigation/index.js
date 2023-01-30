import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Image,
  Loading,
  Tooltip,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ThemeSwitch from "../ThemeSwitch";
import MainContext from "../../context";

import { myBar, myRewards, myCode } from "../../lib/balances/balances";
import { atomicToStamp, atomicToBar } from "../../lib/balances/utils.js";

import image from "../../winston.png";
//import babyImage from "../../winstonBaby.png";
//import babyImage2 from "../../winstonBaby2.png";

export default function Navigation() {
  const fallbackImage = "https://arweave.net/LQ070fmMUlAD1zBxqh3UmGF5WHMAiq-JKDjPVcl8W0M";
  const { addr, disconnectWallet, userData } = useContext(MainContext);
  const [userBalances, setUserBalances] = useState();
  const [avatar, setAvatar] = useState(fallbackImage);
  const navigate = useNavigate();
  const collapseItems = [
    { value: "Home", page: "." },
    { value: "Dashboard", page: "Dashboard" },
    { value: "Search", page: "AccountViewer" },
    { value: "Testpage", page: "Testpage" },
  ];

  useEffect(() => {
    (async () => {
      try {
        if (addr === null) {
          setAvatar(fallbackImage);
          setUserBalances(null);
        }
        if (userData) {
          let user = {};

          if (userData !== null) {
            let { ANS, ARK, ArProfile } = userData;
            ARK?.ARWEAVE?.ANS?.avatar.length > 0
              ? setAvatar( `https://arweave.net/${ARK.ARWEAVE.ANS.avatar}`)
              : ANS?.avatar?.length > 0
              ? setAvatar( `https://arweave.net/${ANS.avatar}` )
              : ArProfile?.profile?.avatar?.length > 0 && ArProfile.profile.avatar !== "ar://OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA"
              ? setAvatar(`https://arweave.net/${ArProfile.profile.avatar}`)
              : setAvatar(fallbackImage);
          }
          user.bar = await myBar(addr);
          user.stamp = await myRewards(addr);
          user.code = await myCode(addr);
          setUserBalances(user);
        }
      } catch (error) {
        console.log(error);
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
          <Image src={image} alt="Winston" />
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
            "@sm": {
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
            <Tooltip
              content={addr ? null : "Sign-In"}
              placement="bottomStart"
              hideArrow
              contentColor="success"
              trigger="hover"
            >
              <Dropdown.Trigger css={{"border-radius":"50px"}}>
                
                <Image src={avatar} alt="Winston" height={50} style={{borderRadius:"50px", border:"1px solid #008c9e"}}
                width={50} />
                {/* <Avatar bordered size="xl" src={ avatar } alt="avatar" title="avatar"/> */}
              </Dropdown.Trigger>
            </Tooltip>
            <Dropdown.Menu aria-label="User menu actions" color="secondary">
              <Dropdown.Item
                key="profile"
                css={{ height: "$18" }}
                color="success"
                textValue="disconnect"
                onClick={() => console.log("BOX CLICKED")}
              >
                {addr ? (
                  <>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      YourName.eth.ar.lens{""}
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

              {addr && (
                <Dropdown.Item key="balances" withDivider textValue="balances">
                  BALANCES{" "}
                  {userBalances === null && <Loading type="points-opacity" />}
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
