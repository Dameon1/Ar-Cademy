import Arweave from 'arweave'
import * as nearAPI from "near-api-js";

export const arweave = Arweave.init({})
 const APP_NAME =  "Ar-Cademy"

export const createPostInfo = async (node) => {
  console.log(node)
  const ownerAddress = node.owner.address;
  const height = node.block ? node.block.height : -1;
  const timestamp = node.block ? parseInt(node.block.timestamp, 10) * 1000 : -1;
  const postInfo = {
    txid: node.id,
    owner: ownerAddress,
    height: height,
    length: node.data.size,
    timestamp: timestamp,
  }
  postInfo.request = await arweave.api.get(`https://arweave.net/${node.id}`, { timeout: 20000 })
  console.log("postInfo: ", postInfo)
  return postInfo;
 }
 const { keyStores, connect } = nearAPI;
 let tags = [
  {
    name: "App-Name",
    values: [APP_NAME]
  },
  {
    name: "Content-Type",
    values: ["video/mp4"]
  }
]

 export const buildQuery = (topicFilter) => {
  let stringifiedTags = [...tags]
  if (topicFilter) {
    stringifiedTags = [...tags, {
      name: "Topic",
      values: [topicFilter]
    }]
  }
  stringifiedTags = JSON.stringify(stringifiedTags).replace(/"([^"]+)":/g, '$1:')

  const queryObject = { query: `{
    transactions(
      first: 50,
      tags: ${stringifiedTags}
    ) {
      edges {
        node {
          id
          owner {
            address
          }
          data {
            size
          }
          block {
            height
            timestamp
          }
          tags {
            name,
            value
          }
        }
      }
    }
  }`}
  return queryObject;
}

export const tagSelectOptions = [
  { value: 'daos', label: 'DAOs' },
  { value: 'defi', label: 'DeFi' },
  { value: 'nfts', label: 'NFTs' },
  { value: 'developers', label: 'Developers' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'investing', label: 'Investing' },
  { value: 'public-goods', label: 'Public Goods' },
  { value: 'education', label: 'Education' }
]

export const contentTypeSelectOptions = [
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' },
]

const ethProviders = ["MetaMask", "WalletConnect"];

export const currencyMap = {
    solana: {
      providers: ["Phantom"],
      opts: {},
    },
    matic: {
      providers: ethProviders,
      opts: {
        chainId: 137,
        chainName: "Polygon Mainnet",
        rpcUrls: ["https://polygon-rpc.com"],
      },
    },
    arbitrum: {
      providers: ethProviders,
      opts: {
        chainName: "Arbitrum One",
        chainId: 42161,
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      },
    },
    bnb: {
      providers: ethProviders,
      opts: {
        chainName: "Binance Smart Chain",
        chainId: 56,
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
      },
    },
    avalanche: {
      providers: ethProviders,
      opts: {
        chainName: "Avalanche Network",
        chainId: 43114,
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      },
    },
    boba: {
      providers: ethProviders,
      opts: {
        chainName: "BOBA L2",
        chainId: 288,
        rpcUrls: ["https://mainnet.boba.network"],
      },
    },
    near: {
      providers: ["wallet.near.org"],
      opts: {
        networkId: "mainnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      },
    },
    // arweave: {
    //   providers: ["arconnect","arweave.app"],
    // },
  } ;
  