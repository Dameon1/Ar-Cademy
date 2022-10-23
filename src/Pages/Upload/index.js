import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context";
import { utils } from "ethers";
import BigNumber from "bignumber.js";
import "./upload.css";
import { AMW } from "../../utils/api";
import { currencyMap } from "../../utils/index";
import Select from "react-select";
import BundlrDemo from "../../components/BundlrDemo/BundlrDemo";
import { deploy, deployBundlr } from "../../lib/imgLib/deploy-path.js";
import PermaVideo from "../../components/PermaVideo";
import PermaIMG from "../../components/PermaIMG";
//import StampDemo from "../../components/StampDemo";
import IMG from "../../components/IMG";
import React from "react";
import { WebBundlr } from "@bundlr-network/client";
import {
  Button,
  Grid,
  Loading,
  Text,
  Spacer,
  Input,
  Dropdown,
  Tooltip,
  Container,
  Row,
  Col,
} from "@nextui-org/react";
import { providers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import * as nearAPI from "near-api-js";

import { connect, keyStores, WalletConnection } from "near-api-js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
//import WalletConnectProvider from "@walletconnect/web3-provider";
//const PhantomWalletAdapter = require("@solana/wallet-adapter-phantom/lib/cjs/index").PhantomWalletAdapter

const supportedCurrencies = {
  matic: "matic",
  ethereum: "ethereum",
  avalanche: "avalanche",
  bnb: "bnb",
  arbitrum: "arbitrum",
};

const currencyOptions = Object.keys(supportedCurrencies).map((v) => {
  return {
    value: v,
    label: v,
  };
});

const APP_NAME = "Ar-Cademy";

export const tagSelectOptions = [
  { value: "daos", label: "DAOs" },
  { value: "defi", label: "DeFi" },
  { value: "nfts", label: "NFTs" },
  { value: "developers", label: "Developers" },
  { value: "gaming", label: "Gaming" },
  { value: "investing", label: "Investing" },
  { value: "public-goods", label: "Public Goods" },
  { value: "education", label: "Education" },
];

export default function Upload() {
  const { addr, setAddr, setWalletName, walletName } = useContext(MainContext);
  const [imgCache, setImgCache] = useState([]);
  const defaultCurrency = "Select a Currency";
  const [currency, setCurrency] = useState(defaultCurrency);
  const [bundlrInstance, setBundlrInstance] = useState();
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [fileCost, setFileCost] = useState();
  const [address, setAddress] = useState("");
  const [originalFile, setOriginalFile] = useState();
  // const [uploadFileCost, setUploadFileCost] = useState();
  // const [withdrawAmount, setWithdrawAmount] = useState();
  const [description, setDescription] = useState("");
  const [tagSelectState, setTagSelectState] = useState();
  const [localVideo, setLocalVideo] = useState();
  const [URI, setURI] = useState();
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState(0);
  const [topics, setTopics] = useState("");

  const navigate = useNavigate();

  function toast(x) {
    return console.log(x);
  }
  function showError(msg) {
    console.log("error:", msg);
  }

  const clean = async () => {
    //clearInterval(intervalRef.current)
    setBalance(undefined);
    setBundlrInstance(undefined);
    //setImg(undefined);
    //setPrice(undefined);
    //setBundler(undefined);
    //setProvider(undefined);
    setLocalVideo(undefined);
    setFileCost("");
    setAddress("");
    setCurrency(defaultCurrency);
    //setSelection(defaultSelection);
  };

  async function handleCurrencyChange(currency) {
    clean();
    setCurrency(currency);
  }

  async function fetchBalance() {
    const bal = await AMW.getBalance();
    setBalance(utils.formatEther(bal.toString()));
  }

  async function fundWallet() {
    if (!amount) return;
    const amountParsed = parseInput(amount);
    try {
      await bundlrInstance.fund(amountParsed);
      fetchBalance();
    } catch (err) {
      console.log("Error funding wallet: ", err);
    }
  }

  function parseInput(input) {
    const conv = new BigNumber(input).multipliedBy(AMW.currencyConfig);
    if (conv.isLessThan(1)) {
      console.log("error: value too small");
      return;
    } else {
      return conv;
    }
  }

  // function onFileChange(e) {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   checkUploadCost(file.size);
  //   if (file) {
  //     const video = URL.createObjectURL(file);
  //     setLocalVideo(video);
  //     let reader = new FileReader();
  //     reader.onload = function (e) {
  //       if (reader.result) {
  //         setFile(Buffer.from(reader.result));
  //       }
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // }
  function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    console.log(file);
    checkUploadCost(file.size);
    setOriginalFile(file);
    if (file) {
      const video = URL.createObjectURL(file);
      setLocalVideo(video);
      let reader = new FileReader();
      reader.onload = function (e) {
        if (reader.result) {
          setFile(Buffer.from(reader.result));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  async function checkUploadCost(bytes) {
    if (bytes) {
      const cost = await bundlrInstance.getPrice(bytes);
      console.log(cost);
      //setFileCost(utils.formatEther(cost.toString()));
      setFileCost(bundlrInstance.utils.unitConverter(cost).toString());
      //bundlrInstance.utils.unitConverter(price).toString()
    }
  }
  // async function checkUploadCost(bytes) {
  //   if (bytes) {
  //     const cost = await AMW.getPrice(bytes);
  //     setFileCost(utils.formatEther(cost));
  //   }
  // }

  async function uploadFile() {
    if (!file) return;
    const tags = [{ name: "Content-Type", value: "video/mp4" }];
    try {
      let tx = await AMW.uploader(file, tags);
      setURI(`https://arweave.net/${tx.data.id}`);
    } catch (err) {
      console.log("Error uploading video: ", err);
    }
  }

  // async function saveVideo() {
  //   if (!file || !title || !description) return;
  //   const tags = [
  //     { name: "Content-Type", value: "application/json" },
  //     { name: "App-Name", value: APP_NAME },
  //   ];

  //   if (tagSelectState) {
  //     tags.push({
  //       name: "Topic",
  //       value: tagSelectState.value,
  //     });
  //   }

  //   const video = {
  //     title,
  //     description,
  //     URI,
  //     createdAt: new Date(),
  //     createdBy: addr,
  //   };

  //   try {
  //     let tx = await AMW.createTransaction(JSON.stringify(video), { tags });
  //     // await tx.sign()
  //     // await tx.upload()
  //   } catch (err) {
  //     console.log("error uploading video with metadata: ", err);
  //   }
  // }

  async function bundlr() {
    setAddr(await AMW.connect("bundlr"));
    setWalletName("bundlr");
  }
  const toProperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  };
  const providerMap = {
    MetaMask: async (c) => {
      const provider = new providers.Web3Provider(window.ethereum);
      await provider._ready();
      const bundlr = new WebBundlr(
        "https://node2.bundlr.network",
        currency,
        provider
      );
      await bundlr.utils.getBundlerAddress(currency);
      await bundlr.ready();
      setAddress(bundlr?.address);
      setBundlrInstance(bundlr);
    },
    //"WalletConnect": async (c: any) => { return await connectWeb3(await (new WalletConnectProvider(c)).enable()) },
    Phantom: async (c) => {
      if (window.solana.isPhantom) {
        await window.solana.connect();
        const p = new PhantomWalletAdapter();
        await p.connect();
        const bundlr = new WebBundlr(
          "https://node2.bundlr.network",
          currency,
          p
        );
        await bundlr.ready();
        setAddress(bundlr?.address);
        setBundlrInstance(bundlr);
      }
    },
    Near: async () => {
      const connectionConfig = {
        networkId: "mainnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      };

      // connect to NEAR
      const nearConnection = await connect(connectionConfig);

      // create wallet connection
      const walletConnection = new WalletConnection(nearConnection);

      // const nearConfig = {
      //   networkId: "mainnet",
      //   keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      //   nodeUrl: "https://rpc.mainnet.near.org",
      //   walletUrl: "https://wallet.mainnet.near.org",
      //   helperUrl: "https://helper.mainnet.near.org",
      //   explorerUrl: "https://explorer.mainnet.near.org",
      // }
      // const near = await connect(nearConfig);
      // const wallet = new WalletConnection(near, "Arcademy");
      // const nearKeyStore = new keyStores.BrowserLocalStorageKeyStore();

      // const providerInstance = await connect({
      //   networkId: "mainnet",
      //   keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      //   nodeUrl: "https://rpc.mainnet.near.org",
      //   walletUrl: "https://wallet.mainnet.near.org",
      //   helperUrl: "https://helper.mainnet.near.org",
      //   explorerUrl: "https://explorer.mainnet.near.org",
      // }).catch((e) => {
      //   toast({
      //     status: "error",
      //     title: `Failed to load provider ${wallet}`,
      //     duration: 10000,
      //   });
      //   console.log(e);
      //   return;
      // });

      if (!walletConnection.isSignedIn()) {
        toast({
          status: "info",
          title: "You are being redirected to authorize this application...",
        });
        window.setTimeout(() => {
          walletConnection.requestSignIn("Arcademy");
        }, 4000);
        // wallet.requestSignIn();
      } else {
        setAddress(walletConnection.getAccountId());
      }

      const bundlr = new WebBundlr(
        "https://node2.bundlr.network",
        currency,
        walletConnection
      );
      await bundlr.ready();
      setAddress(bundlr?.address);
      setBundlrInstance(bundlr);
    },
  };

  async function initializeBundlr() {
    switch (currency) {
      case "solana":
        await providerMap.Phantom();
        break;
      case "near":
        await providerMap.Near();
        break;
      case "arweave":
        console.log("connectArweave");
        break;
      default:
        await providerMap.MetaMask();
    }
  }
  async function doDeploy(e) {
    console.log("currency:", currency);
    //const topics = [{ name: "Content-Type", value: "video/mp4" }];

    if (currency === "matic") {
      if (!window.ethereum) {
        showError("Metamask is required!");
        return;
      }
      try {
        await window.ethereum.enable();
        const provider = new providers.Web3Provider(window.ethereum);
        await provider._ready();

        const bundlr = new WebBundlr(
          "https://node2.bundlr.network",
          currency,
          provider
        );

        await bundlr.ready();

        // fund account
        const price = await bundlrInstance.getPrice(originalFile.size);
        const balance = await bundlr.getLoadedBalance();
        const uploadCost = utils.formatEther(
          price.minus(balance).multipliedBy(1.1).toFixed(0)
        );
        if (balance.isLessThan(price)) {
          await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
        }

        const trx = bundlr.createTransaction(file, {
          tags: [{ name: "Content-Type", value: originalFile.type }],
        });

        await trx.sign();
        console.log("Signed transaction");
        const result = await trx.upload();
        console.log("Uploaded");
        //const addr = "zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE";
        console.log(
          "DEPLOY BUNDLR PROPS",
          title,
          description,
          addr,
          originalFile.type,
          result.data.id,
          topics,
          uploadCost
        );
        const result2 = await deployBundlr(
          title,
          description,
          addr,
          originalFile.type,
          result.data.id,
          topics,
          uploadCost
        );
        console.log("Completed Upload, redirecting 3...");
        // reset form
        document.forms[0].reset();
        console.log("Completed Upload, redirecting 2...");

        //setTx(result2.id);
        console.log("Completed Upload, redirecting 1...");

        setImgCache([
          ...imgCache,
          { id: result2.id, src: URL.createObjectURL(originalFile) },
        ]);
        console.log(`https://arweave.net/${result2.id}`);
        console.log("Completed Upload, redirecting 0...");

        setTimeout(() => {
          navigate(`/AssetManagement/${result2.id}`);
        }, 2000);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      <div>
        <Row className="text-container">
          <Col>
            <h2>Welcome to Ar-Cademy</h2>
            <p className="site-introduction">
              This is a work in progress. Experimenting with the spectrum of
              uploads on Arweave. These range from simple string metadata stored
              directly on Arweave completely, to a range of NFT capabilities
              that store on Ardrive, can be managed on Darkblock or Koii
              Network, that includes serving the content through the Meson
              Networks CDN Polygon contract and uses the new WARP contracts from
              Redstone.
            </p>
          </Col>
        </Row>
        <Grid.Container gap={2}>
          <Grid>
            <Col className="wallet">
              <h4>Step 1</h4>
              <p className={"labelStyle"}>Payment prep</p>
              <Col justify="center" align="center" gap={1}>
                <Row justify="center" align="center">
                  <Col className="form-control">
                    <Dropdown>
                      <Dropdown.Button>
                        {toProperCase(currency)}
                      </Dropdown.Button>
                      <Dropdown.Menu
                        onAction={(key) => handleCurrencyChange(key)}
                      >
                        {/* // onAction={(key: anay) => { clean(); setCurrency() }}> */}
                        {Object.keys(currencyMap).map((v) => {
                          return (
                            <Dropdown.Item key={v}>
                              {toProperCase(v)}
                            </Dropdown.Item>
                          ); // proper/title case
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col>
                    <Button
                      disabled={currency === defaultCurrency}
                      onPress={
                        bundlrInstance
                          ? () => clean()
                          : async () => await initializeBundlr()
                      }
                      color={bundlrInstance ? "warning" : "gradient"}
                    >
                      {bundlrInstance ? "Disconnect" : "Connect"}
                    </Button>
                  </Col>
                </Row>
                <p>
                  {toProperCase(currency)} Account:{address}{" "}
                </p>
              </Col>
              {/* <BundlrDemo /> */}

              <div>
                <div className={"formStyle"}>
                  <p className={"labelStyle"}>Add Video</p>

                  <div>
                    <input type="file" onChange={onFileChange} />
                  </div>

                  {localVideo && (
                    <video
                      key={localVideo}
                      width="320"
                      height="240"
                      controls
                      className={"videoStyle"}
                    >
                      <source src={localVideo} type="video/mp4" />
                    </video>
                  )}

                  {fileCost && (
                    <h4>
                      Cost to upload: {Math.round(fileCost * 1000) / 1000}{" "}
                      {toProperCase(currency)}
                    </h4>
                  )}
                  {/* <button className={"buttonStyle"} onClick={uploadFile}>Upload Video</button> */}

                  <div>
                    <div className={"formStyle"}>
                      <p className={"labelStyle"}>Title</p>
                      <input
                        className={"inputStyle"}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Video title"
                      />
                      <p className={"labelStyle"}>Description</p>
                      <textarea
                        placeholder="Video description"
                        onChange={(e) => setDescription(e.target.value)}
                        className={"textAreaStyle"}
                      />
                      <p className={"labelStyle"}>Tag</p>
                      <Select
                        options={tagSelectOptions}
                        className={"selectStyle"}
                        onChange={(data) => setTagSelectState(data)}
                        isClearable
                      />
                    </div>
                  </div>
                </div>
                <Button onPress={doDeploy}>DEPLOY ATOMIC VIDEO</Button>
                {/* <IMG /> */}
              </div>
            </Col>
          </Grid>
          <Grid>
            <Col className="wallet">
              <h4>Step 3</h4>
              <IMG />
            </Col>
          </Grid>
        </Grid.Container>
        {/* <div className={"formStyle"}></div> */}
        {/* <div className="connection">
        <div className="wallet">
          <PermaVideo />
        </div>
      </div> */}
      </div>
    </>
  );
}
