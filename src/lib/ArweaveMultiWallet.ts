import { ArweaveWebWallet } from "arweave-wallet-connector";
import { providers } from "ethers";
import { WebBundlr } from "@bundlr-network/client";
import Arweave from 'arweave';

import { icons } from "../static";

console.log(Arweave)

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION"
];

const webWallet = new ArweaveWebWallet({
  name: 'Account',
  logo: icons.metaweave
});
webWallet.setUrl('arweave.app');

export default class ArweaveMultiWallet {
  public walletName: any | null = null;
  private walletEngine: any | null = null;
  private arweave: Arweave;

  constructor(Arweave) {
    this.arweave = Arweave;
  }

  async connect(walletName, walletEngine) {
    this.walletName = walletName;
    this.walletEngine = walletEngine;

    if (walletName === "arconnect") {
      if (!walletEngine) {
        window.open("https://arconnect.io");
        return null;
      }
      try {
        await walletEngine.connect(arConnectPermissions);
        return await walletEngine.getActiveAddress();
      } catch {
        alert("Error: Could not connect to ArConnect");
        this.walletName = null;
        this.walletEngine = null;
        return null;
      }
    }

    if (walletName === "webwallet") {
      await webWallet.connect();
      this.walletEngine = await webWallet.namespaces.arweaveWallet;
      const addr = await this.walletEngine.getActiveAddress();
      return addr ? addr : null;
    }
    //   else if (walletName === "bundlr") {
    //     const connectWeb3 = async (connector) => {
    //       const p = new providers.Web3Provider(connector);
    //       await p._ready();
    //       return p
    //     }

    //     const providerMap = {
    //       "MetaMask": async (c) => {
    //         if (!(window)?.ethereum?.isMetaMask) return;
    //         await (window).ethereum.enable();
    //         const provider = await connectWeb3((window).ethereum);
    //         const chainId = `0x${c.chainId.toString(16)}`
    //         try { // additional logic for requesting a chain switch and conditional chain add.
    //           await (window).ethereum.request({
    //             method: 'wallet_switchEthereumChain',
    //             params: [{ chainId }],
    //           })
    //         } catch (e) {
    //           if (e.code === 4902) {
    //             await (window).ethereum.request({
    //               method: 'wallet_addEthereumChain',
    //               params: [{
    //                 chainId, rpcUrls: c.rpcUrls, chainName: c.chainName
    //               }],
    //             });
    //           }
    //         }
    //         return provider;
    //       }
    //     }

    //     const currencyMap = {
    //       "matic": {
    //         providers: ["MetaMask"],
    //         opts: {
    //           chainId: 137,
    //           chainName: 'Polygon Mainnet',
    //           rpcUrls: ["https://polygon-rpc.com"],
    //         },
    //       },
    //     }

    //     const providerFunc = providerMap["MetaMask"];
    //     const currency = currencyMap["matic"];
    //     const provider = await providerFunc(currency.opts);
    //     this.walletEngine = new WebBundlr("https://node1.bundlr.network", "matic", provider);
    //     console.log("bundlr", this.walletEngine);
    //     await this.walletEngine.ready();
    //     return this.walletEngine.address;
    //   }
    //   else {
    //     this.walletName = null;
    //     this.walletEngine = null;
    //     return null;
    //   }
    // }

    // async write(data, tags) {
    //   if (this.walletName === "arconnect" || this.walletName === "webwallet") {
    //     try {
    //       const tx = await this.arweave.createTransaction({ data });
    //       tags.map(tag => tx.addTag(tag.name, tag.value));
    //       await this.arweave.transactions.sign(tx);
    //       console.log("tx", tx);
    //       return { ...await this.arweave.transactions.post(tx), txid: tx.id };
    //     }
    //     catch (e) {
    //       console.log("catch error: ", e);
    //       return null;
    //     }
    //   }
    //   else if (this.walletName === "bundlr") {
    //     try {
    //       const tx = this.walletEngine.createTransaction(data, { tags });
    //       console.log("tx", tx);
    //       await tx.sign();
    //       console.log("signed");
    //       const result = await tx.upload();
    //       console.log("result", result);
    //       return { ...result, txid: result.data.id };
    //     }
    //     catch (e) {
    //       console.log("catch error: ", e);
    //       return null;
    //     }
    //   }
    // }
  }
  async disconnect() {
    console.log("this.walletEngine", this.walletEngine);
    if (this.walletName === "arconnect" || this.walletName === "webwallet")
      this.walletEngine.disconnect();

    this.walletEngine = null;
  }

  async getBalance() {
    if (this.walletName === "bundlr") {
      const balance = await this.walletEngine.getLoadedBalance();
      console.log("balance", balance);
      return this.walletEngine.utils.unitConverter(balance).toFixed(7, 2).toString() + " " + this.walletEngine.currencyConfig.ticker.toLowerCase()
    }
  }
}