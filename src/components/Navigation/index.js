import {Navbar, Text, Avatar, Dropdown, Image, Tooltip } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ThemeSwitch from "../ThemeSwitch";
import MainContext from "src/context";
import image from "../../assets/favicon.ico";
import { myBar, myRewards, myCode } from "../../lib/balances/balances";
import { atomicToStamp, atomicToBar } from "../../lib/balances/utils.js";

export default function Navigation() {
  const { addr, disconnectWallet } = useContext(MainContext);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const collapseItems = [
    { value: "Home", page: "/" },
    { value: "Dashboard", page: "/Dashboard" },
    { value: "Search", page: "/AccountViewer" },
    { value: "Testpage", page: "/Testpage" },
  ];

  useEffect(() => {
    (async () => {
      try {
        if (!addr) return;
        let user = {};
        user.bar = await myBar(addr);
        user.stamp = await myRewards(addr);
        user.code = await myCode(addr);
        setUserData(user);
      } catch (error) {
        console.log(error);
      } finally {
      }
    })();
  }, [addr]);

  function actionHandler(key) {
    console.log(key);
  }

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
            {/* <Link
              className="textNoDec collapseMenuText"
              key={item.value}
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              to={`/${item.page}`}
            > */}
              <p onClick={()=>navigate(`/${item.page}`)}>{item.value}</p>
            {/* </Link> */}
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      <Navbar.Content hideIn="sm" variant="highlight" justify="flex-end">
        <Link to="/" className="navigationLinks">
          <Image src={image} />
        </Link>
        <Link to="/Dashboard" className="navigationLinks">
          Dashboard
        </Link>
        <Link to="/AccountViewer" className="navigationLinks">
          Search
        </Link>
      </Navbar.Content>

      {/* <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
            ACME
          </Text> */}

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
              <Avatar
                bordered
                as="button"
                color="primary"
                size="md"
                src={addr ? image : null}
              />
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
              <Dropdown.Item key="balances" withDivider textValue="balances">
                BALANCES
              </Dropdown.Item>

              {addr && userData &&
                <Dropdown.Item key="$bAR" withDivider textValue="number of Bar">
                  $bAR: {Number(atomicToBar(userData.bar)).toFixed(2)}
                </Dropdown.Item>
              }
              {addr && userData && (
                <Dropdown.Item key="$code" textValue="number of Code">
                  $Code: {userData.code}
                </Dropdown.Item>
              )}
              {addr && userData && (
                <Dropdown.Item key="$Stamp" textValue="number of Stamp">
                  $Stamp: {Number(atomicToStamp(userData.stamp)).toFixed(2)}
                </Dropdown.Item>
              )}

              {addr && userData && (
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
