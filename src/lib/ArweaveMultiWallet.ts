
//THIS FILE IS THE ENTRY POINT FOR WALLET/IDENTITY MANAGEMENT

import { ArweaveWebWallet } from "arweave-wallet-connector";
import { providers } from "ethers";
import { WebBundlr } from "@bundlr-network/client";
import Arweave from 'arweave';

import { icons } from "../static";
import { T_addr, T_walletName } from "../utils/types";


const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "SIGN_TRANSACTION",
  "DISPATCH"
];

const webWallet = new ArweaveWebWallet({
  name: 'Arcademy',
  logo: "https://ar-io.net/LQ070fmMUlAD1zBxqh3UmGF5WHMAiq-JKDjPVcl8W0M"
});
webWallet.setUrl('arweave.app');

export default class ArweaveMultiWallet {
  public walletName: T_walletName | null = null;
  private walletEngine: any | null = null;
  private arweave: Arweave;

  constructor(arweave: Arweave) {
    this.arweave = arweave;
  }

  public async connect(walletName: T_walletName, walletEngine?: any): Promise<T_addr | null> {
    this.walletName = walletName;
    this.walletEngine = walletEngine;

    if (walletName === "arconnect") {
      if (!walletEngine) {
        window.open("https://arconnect.io");
        return null;
      }
      try {
        await walletEngine.connect(arConnectPermissions, { name: "Arcademy" });
        return await walletEngine.getActiveAddress();
      } catch {
        alert("Error: Could not connect to ArConnect");
        this.walletName = null;
        this.walletEngine = null;
        return null;
      }
    }
    else if (walletName === "webwallet") {
      await webWallet.connect();
      this.walletEngine = await webWallet.namespaces.arweaveWallet;
      const addr = await this.walletEngine.getActiveAddress();
      return addr ? addr : null;
    } 
    else if (walletName === "bundlr") {
      const connectWeb3 = async (connector: any) => {
        const p = new providers.Web3Provider(connector);
        await p._ready();
        return p
      }

      const providerMap = {
        "MetaMask": async (c: any) => {
          if (!(window as any)?.ethereum?.isMetaMask) return;
          // @ts-ignore
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = await connectWeb3((window as any).ethereum);
          const chainId = `0x${c.chainId.toString(16)}`
          try { // additional logic for requesting a chain switch and conditional chain add.
            await (window as any).ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId }],
            })
          } catch (e: any) {
            if (e.code === 4902) {
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId, rpcUrls: c.rpcUrls, chainName: c.chainName
                }],
              });
            }
          }
          return provider;
        }
      }

      const currencyMap = {
        "matic": {
          providers: ["MetaMask"],
          opts: {
            chainId: 137,
            chainName: 'Polygon Mainnet',
            rpcUrls: ["https://polygon-rpc.com"],
          },
        },
      }

      const providerFunc = providerMap["MetaMask"];
      const currency = currencyMap["matic"];
      const provider = await providerFunc(currency.opts);
      this.walletEngine = new WebBundlr("https://node2.bundlr.network", "matic", provider);
      await this.walletEngine.ready();
      return this.walletEngine.address;
    }
    else {
      this.walletName = null;
      this.walletEngine = null;
      return null;
    }
  }

  public async write(data: string | ArrayBuffer, tags: { name: string, value: string }[]) {
    if (this.walletName === "arconnect" || this.walletName === "webwallet") {
      try {
        const tx = await this.arweave.createTransaction({ data });
        tags.map(tag => tx.addTag(tag.name, tag.value));
        await this.arweave.transactions.sign(tx);
        console.log("tx", tx);
        return { ...await this.arweave.transactions.post(tx), txid: tx.id };
      }
      catch (e) {
        console.log("catch error: ", e);
        return null;
      }
    }
    else if (this.walletName === "bundlr") {
      try {
        const tx = this.walletEngine.createTransaction(data, { tags });
        console.log("tx", tx);
        await tx.sign();
        console.log("signed");
        const result = await tx.upload();
        console.log("result", result);
        return { ...result, txid: result.data.id };
      }
      catch (e) {
        console.log("catch error: ", e);
        return null;
      }
    }
  }

  public async disconnect(): Promise<void> {
    console.log("this.walletEngine", this.walletEngine);
    if (this.walletName === "arconnect" || this.walletName === "webwallet"){
      this.walletEngine.disconnect();
      this.walletEngine = null;
    }
  }

  public async getBalance() {
    if (this.walletName === "bundlr") {
      const balance = await this.walletEngine.getLoadedBalance();
      console.log("balance", this.walletEngine.utils.unitConverter(balance).toFixed(7, 2));
      return this.walletEngine.utils.unitConverter(balance).toFixed(7, 2)
      // return this.walletEngine.utils.unitConverter(balance).toFixed(7, 2).toString() + " " + this.walletEngine.currencyConfig.ticker.toLowerCase()
    }
  }
  public async getPrice(bytes) {
    console.log(this.walletName, "NAME1", bytes)
    if (this.walletName === "bundlr") {
      return await this.walletEngine.getPrice(bytes);
    }
  }
  public async fund(amount) {
    console.log(this.walletName, "funding bundlr network with ",typeof amount,amount)
    if (this.walletName === "bundlr") {
      return await this.walletEngine.fund(amount);
    }
  }
  public async withdrawBalance(amount) {
    console.log(this.walletName, "funding bundlr network", amount)
    if (this.walletName === "bundlr") {
      return await this.walletEngine.withdrawBalance(amount);
    }
  }
  public async currencyConfig(amount) {
    console.log(this.walletName, "funding bundlr network", amount)
    if (this.walletName === "bundlr") {
      return await this.walletEngine.currencyconfig(amount);
    }
  }
  public async uploader(file) {
    console.log(this.walletName, "bundlr uploading", file.data, file.tags)
    if (this.walletName === "bundlr") {
      return await this.walletEngine.uploader.upload(file.data, file.tags)
    }
  } 
  public async createTransaction(data, tags) {
    console.log(this.walletName, "bundlr uploading", data, tags)
    if (this.walletName === "bundlr") {
      const tx = this.walletEngine.createTransaction(data, { tags });
        console.log("tx", tx);
        await tx.sign();
        console.log("signed");
        const result = await tx.upload();
        console.log("result", result);
        return { ...result, txid: result.data.id };
    }
  }
}