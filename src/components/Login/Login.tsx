// This file is for Arcademy identity
//

import { useContext } from "react";
import useArConnect from "use-arconnect";
import { icons } from "../../static";
import UserProfile from "../UserProfile/UserProfile";
import { AMW } from "../../utils/api";
import MainContext from "../../context";
import {
  Container,
  Button,
  Grid,
  Loading,
  Text,
  Spacer,
  Row,
  Col,
} from "@nextui-org/react";

function Login({ onClick }: { onClick?: () => void }) {
  const {
    isLoading,
    setIsLoading,
    theme,
    addr,
    walletName,
    setWalletName,
    setAddr,
  } = useContext(MainContext);
  const arConnect = useArConnect();

  const disconnectWallet = async () => {
    await AMW.disconnect();
    setAddr(null);
  };

  const login = {
    arconnect: async () => {
      setAddr(await AMW.connect("arconnect", arConnect));
      setWalletName("arconnect");
    },
    arweaveWebWallet: async () => {
      setAddr(await AMW.connect("webwallet"));
      setWalletName("webwallet");
    },
    bundlr: async () => {
      setAddr(await AMW.connect("bundlr"));
      setWalletName("bundlr");
    },
  };

  return isLoading ? (
    <Grid.Container gap={1} justify="center">
      <Loading size="xl" css={{ padding: "$24" }} />
    </Grid.Container>
  ) : addr && walletName ? (
    // User signed in
    <UserProfile
      addr={addr}
      walletName={walletName}
      disconnectWallet={disconnectWallet}
    />
  ) : (
    <Container>
      <Row wrap="wrap" align="center" justify="center">
        <Col
          className="wallet"
          onClick={async () => {
            setIsLoading(true);
            await login.arconnect();
            setIsLoading(false);
          }}
        >
          <img className="iconImg" src={icons.arconnect} alt="ArConnect" />
          <h4 className="walletText">ArConnect</h4>
        </Col>
        <Col
          className="wallet"
          onClick={async () => {
            setIsLoading(true);
            await login.bundlr();
            setIsLoading(false);
          }}
        >
          <img className="iconImg" src={icons.bundlr} alt="Bundlr network" />
          <h4 className="walletText">Bundlr</h4>
        </Col>
        <Col
          className="wallet"
          onClick={async () => {
            setIsLoading(true);
            await login.arweaveWebWallet();
            setIsLoading(false);
          }}
        >
          <img
            className="iconImg"
            src={
              theme ? icons.arweaveWebWallet.dark : icons.arweaveWebWallet.light
            }
            alt="arweave.app"
          />
          <h4 className="walletText">arweave.app</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
