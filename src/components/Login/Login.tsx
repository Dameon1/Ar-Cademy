import { useContext, useEffect } from 'react';
import useArConnect from 'use-arconnect';
import { icons } from '../../static';
import UserProfile from '../UserProfile/UserProfile';
import { Grid, Loading } from '@nextui-org/react';
import { AMW } from '../../utils/api';
import MainContext from '../../context';

function Login({ onClick }: { onClick?: () => void }) {
  const { isLoading,
    setIsLoading,
    theme,
    addr,
    walletName,
    setWalletName,
    setaddr } = useContext(MainContext);
  const arConnect = useArConnect();

  useEffect(() => {
    if (!arConnect) return;
    (async () => {
      try {
        if ((await arConnect.getPermissions()).includes("ACCESS_ADDRESS")) {
          setaddr(await arConnect.getActiveAddress());
        }
      } catch {
        alert("Error: Could not get ACCESS_ADDRESS permission");
      }
    })();
  }, [arConnect, addr, setaddr]);

  const disconnectWallet = async () => {
    await AMW.disconnect();
    setaddr(null);
  };

  const login = {
    arconnect: async () => {
      setaddr(await AMW.connect("arconnect", arConnect));
      setWalletName("arconnect");
    },
    arweaveWebWallet: async () => {
      setaddr(await AMW.connect("webwallet"));
      setWalletName("webwallet");
    },
    bundlr: async () => {
      console.log("bundlr");
      setaddr(await AMW.connect("bundlr"));
      setWalletName("bundlr");
    }
  }

  return (isLoading
    ? <Grid.Container gap={1} justify="center">
      <Loading size="xl" css={{ padding: '$24' }} />
    </Grid.Container>
    : addr && walletName
      ? <UserProfile addr={addr} walletName={walletName} disconnectWallet={disconnectWallet} />
      : <div className="connection">
        <div className="wallet" onClick={async () => {
          setIsLoading(true);
          await login.arconnect();
          setIsLoading(false);
        }}>
          <img src={icons.arconnect} alt="ArConnect" />
          <h4>ArConnect</h4>
        </div>
        <div className="wallet" onClick={async () => {
          setIsLoading(true);
          await login.bundlr();
          setIsLoading(false);
        }}>
          <img src={icons.bundlr} alt="Bundlr network" />
          <h4>Bundlr ($MATIC)</h4>
        </div>
        <div className="wallet" onClick={async () => {
          setIsLoading(true);
          await login.arweaveWebWallet();
          setIsLoading(false);
        }}>
          <img src={theme ? icons.arweaveWebWallet.dark : icons.arweaveWebWallet.light} alt="arweave.app" />
          <h4>arweave.app</h4>
        </div>
      </div>);
}

export default Login;