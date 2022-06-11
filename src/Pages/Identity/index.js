//import { ArweaveWebWallet } from 'arweave-wallet-connector'
//import ArConnect from '../../api/ArConnect';
import Login from '../../components/Login/Login';
import { urlObject } from "src/lib/api";

//import ArweaveAccount from '../../api/ArweaveAccount';
// async function connect(changeState) {
//   const wallet = new ArweaveWebWallet({
//     // optionally provide information about your app that will be displayed in the wallet provider interface
//     name: 'Arcademy',
//     logo: '../../light.png'
//   })
//   wallet.setUrl('arweave.app')
//   await wallet.connect()
//   changeState(window.arweaveWallet.getActiveAddress());
// }

export function Identity() {
  console.log(urlObject)
  return (
    <>
      <div className="text-container">
        <h2>Identity needs Security</h2>
        <p className="site-introduction">
          Identity is a topic that Arweave is looking to solve in multiple different ways. As our connection to the world grows,
          we need to be able to connect with the people and communities that we are connected to, with the Identity that we are
          comfortable with. Some of these are security risks to personal safety, privacy, and trust.
        </p>
        <p className="site-introduction">
          More to come on the Identity connecting solutions by ArVerify, Decentraland, Verto.Id, and others soon. For now, the
          passport we are using arweave.app
        </p>
      </div>
      <Login />
    </>
  )
}

export default Identity;