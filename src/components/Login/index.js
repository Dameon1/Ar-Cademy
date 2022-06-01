import { useEffect, useState } from 'react';
//import useArConnect from 'use-arconnect';
import { Grid, Loading } from '@nextui-org/react';
import { icons } from '../../static';
//import UserProfile from '../UserProfile';
//import { AMW } from '../../utils/api';


// export function Login() {
//   const arConnect = useArConnect();
//   const [addr, setAddr] = useState(null);
//   const [walletName, setWalletName] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!arConnect) return;
//     (async () => {
//       try {
//         if ((await arConnect.getPermissions()).includes("ACCESS_ADDRESS")) {
//           setAddr(await arConnect.getActiveAddress());
//         }
//       } catch {
//         alert("Error: Could not get ACCESS_ADDRESS permission");
//       }
//     })();
//   }, [arConnect, addr, setAddr]);

//   const disconnectWallet = async () => {
//     await AMW.disconnect();
//     setAddr(null);
//   };

//   const login = {
//     arconnect: async () => {
//       setAddr(await AMW.connect("arconnect", arConnect));
//       setWalletName("arconnect");
//     },
//     arweaveWebWallet: async () => {
//       setAddr(await AMW.connect("webwallet"));
//       setWalletName("webwallet");
//     },
//     bundlr: async () => {
//       console.log("bundlr");
//       setAddr(await AMW.connect("bundlr"));
//       setWalletName("bundlr");
//     }
//   }

//   return (isLoading
//     ? <Grid.Container gap={1} justify="center">
//       <Loading size="xl" css={{ padding: '$24' }} />
//     </Grid.Container>
//     : addr && walletName
//       ? <UserProfile addr={addr} walletName={walletName} disconnectWallet={disconnectWallet} />
//       : <div className="connection">
//         <div className="wallet" onClick={async () => {
//           setIsLoading(true);
//           await login.arconnect();
//           setIsLoading(false);
//         }}>
//           <img src={icons.arconnect} alt="ArConnect" />
//           <h4>ArConnect</h4>
//         </div>
//         <div className="wallet" onClick={async () => {
//           setIsLoading(true);
//           await login.bundlr();
//           setIsLoading(false);
//         }}>
//           <img src={icons.bundlr} alt="Bundlr network" />
//           <h4>Bundlr ($MATIC)</h4>
//         </div>
//         <div className="wallet" onClick={async () => {
//           setIsLoading(true);
//           await login.arweaveWebWallet();
//           setIsLoading(false);
//         }}>
//           <img src={true ? icons.arweaveWebWallet.light : icons.arweaveWebWallet.dark} alt="arweave.app" />
//           <h4>arweave.app</h4>
//         </div>
//       </div>);

// }

// export default Login;

export default function Login() {
  return (
    <p>something</p>
  )
}