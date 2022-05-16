// Import the wallet connector
import { ArweaveWebWallet } from 'arweave-wallet-connector'

async function GetArweaveWebWallet() {
  const wallet = new ArweaveWebWallet({
    name: 'Connector Example',
    logo: '../../light.png'
  })
  wallet.setUrl('arweave.app')
  await wallet.connect()
  console.log(wallet, "wallet----------------------")
  return wallet
}

export default GetArweaveWebWallet;