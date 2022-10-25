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
  Image,
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
  Textarea,
} from "@nextui-org/react";
import { providers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import * as nearAPI from "near-api-js";

import { connect, keyStores, WalletConnection } from "near-api-js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
//import WalletConnectProvider from "@walletconnect/web3-provider";
//const PhantomWalletAdapter = require("@solana/wallet-adapter-phantom/lib/cjs/index").PhantomWalletAdapter

import {} from "@nextui-org/react";

//import { deploy, deployBundlr } from "../../lib/stampLib/deploy-path.js";

import image from "../../assets/favicon.ico";

//   import DeployDialog from "../dialogs/deploy.svelte";
//   import ErrorDialog from "../dialogs/error.svelte";
//   import ConfirmDialog from "../dialogs/confirm.svelte";
//import { imgCache } from "../store.js";

//const WebBundlr = Bundlr.default;

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
  const { addr, setAddr, setWalletName } = useContext(MainContext);
  const defaultCurrency = "Select a Currency";
  const [currency, setCurrency] = useState(defaultCurrency);
  const [isLoading, setIsLoading] = useState(false);
  //bundlr instance and address
  const [bundlrInstance, setBundlrInstance] = useState();
  const [address, setAddress] = useState("");

  const [originalFile, setOriginalFile] = useState();
  const [file, setFile] = useState();

  const [fileCost, setFileCost] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");

  const [localVideo, setLocalVideo] = useState();

  const [amount, setAmount] = useState();

  const navigate = useNavigate();

  function toast(x) {
    return console.log(x);
  }
  function showError(msg) {
    console.log("error:", msg);
  }

  const changeTopics = (event) => {
    setTopics(event.target.value);
  };

  const clean = async () => {
    //clearInterval(intervalRef.current)
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
      reader.onload = function () {
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
      setFileCost(bundlrInstance.utils.unitConverter(cost).toString());
    }
  }

  async function uploadFile() {
    if (!file) return;
    const tags = [{ name: "Content-Type", value: "video/mp4" }];
    try {
      let tx = await AMW.uploader(file, tags);
      //setURI(`https://arweave.net/${tx.data.id}`);
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

        // setImgCache([
        //   ...imgCache,
        //   { id: result2.id, src: URL.createObjectURL(originalFile) },
        // ]);
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

  const handleFileClick = (type) => {
    console.log("type", type);
    var fileInputEl = document.createElement("input");
    fileInputEl.type = "file";
    let currentType = {
      image:
        "image/* image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml",
      video: "video/*",
    };
    fileInputEl.accept = currentType[type];
    fileInputEl.style.display = "none";
    document.body.appendChild(fileInputEl);
    fileInputEl.addEventListener("input", function (e) {
      handleUpload(e, type);
      document.body.removeChild(fileInputEl);
    });
    fileInputEl.click();
  };

  const handleUpload = async (evt, type) => {
    let eventFile = evt.target.files[0];
    if (!eventFile) return;
    checkUploadCost(eventFile.size);
    setOriginalFile(eventFile);
    console.log(eventFile.type);
    //setFiles(evt.target.files);
    //previewVideo(evt)
    let reader = new FileReader();
    const fileUrl = URL.createObjectURL(eventFile);
    if (type === "image") {
    }
    if (type === "video") {
      setLocalVideo(fileUrl);
      reader.onload = function () {
        if (reader.result && type === "video") {
          //const video = URL.createObjectURL(file);
          //setLocalVideo(video);
          setFile(Buffer.from(reader.result));
        }
      };
      reader.readAsArrayBuffer(eventFile);
      //previewImage(evt);
    }
  };
  const previewImage = (e) => {
    const preview = document.getElementById("preview");
    preview.src = URL.createObjectURL(e.target.files[0]);
    preview.onload = () => URL.revokeObjectURL(preview.src);
    //handleFileClick(e);
  };

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
        <Row justify="flex-wrap" wrap="wrap">
          <Col className="wallet">
            <h4>Step 1</h4>
            <p className={"labelStyle"}>Payment prep</p>
            <Col justify="center" align="center" gap={1}>
              <Row justify="center" align="center">
                <Col className="form-control">
                  <Dropdown>
                    <Dropdown.Button>{toProperCase(currency)}</Dropdown.Button>
                    <Dropdown.Menu
                      onAction={(key) => handleCurrencyChange(key)}
                    >
                      {Object.keys(currencyMap).map((v) => {
                        return (
                          <Dropdown.Item key={v}>
                            {toProperCase(v)}
                          </Dropdown.Item>
                        );
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
                    {bundlrInstance ? "Reset" : "Connect"}
                  </Button>
                </Col>
              </Row>
              <p>
                {currency !== defaultCurrency
                  ? `${toProperCase(currency)} Account:${address.slice(0, 4)}`
                  : null}
              </p>
              <Row justify="center" align="center" gap={1} height={100}>
                {/* {localVideo && (
                <>
                  <video
                    key={localVideo}
                    width="320"
                    height="240"
                    controls
                    className={"videoStyle"}
                  >
                    <source src={localVideo} type="video/mp4" />
                  </video>
                  <p>video preview</p>
                  <video
                    key={localVideo}
                    id="preview"
                    width="320"
                    height="240"
                    controls
                    src={localVideo}
                    type="video"
                    className={"videoStyle"}
                  />
                  </>
                )} */}
                {/* {originalFile?.type.split("/")[0] === "image" && (
                  <>
                    <p>img preview</p>
                    <img
                      className="cardImage"
                      src={image}
                      width="320"
                      height="240"
                      id="imagePreview"
                      alt="your upload here"
                    />
                  </>
                )} */}
                {/* {localVideo && (
                  <>
                    <p>video preview</p>
                    <video
                      key={localVideo}
                      width="320"
                      height="240"
                      controls
                      id="videoPreview"
                      src={localVideo}
                      type="video"
                      className={"videoStyle"}
                    />
                  </>
                )} */}
                {!isLoading && originalFile?.type.split("/")[0] === "image" ? (
                  // <div>
                  //   <img
                  //     src={URL.createObjectURL(originalFile)}
                  //     width="100%"
                  //     alt="your upload here"
                  //   />
                  // </div>
                  <Col>
                    <Image
                      src={URL.createObjectURL(originalFile)}
                      alt="your upload here"
                      objectFit="cover"
                      width={160}
                      height={160}
                    />
                  </Col>
                ) : originalFile?.type.split("/")[0] === "video" ? (
                  <Col>
                    <video
                      key={localVideo}
                      width="160"
                      height="160"
                      controls
                      id="videoPreview"
                      src={URL.createObjectURL(originalFile)}
                      type="video"
                      className={"videoStyle"}
                    />
                  </Col>
                ) : (
                  <Col>
                    <Image
                      src={image}
                      alt="Default Image"
                      objectFit="cover"
                      width={160}
                      height={160}
                    />
                  </Col>
                )}
              </Row>
              <Spacer y={0.5} />
              <Row>
                <Col>
                  <Button
                    onPress={() => handleFileClick("image")}
                    aria-label="Select Image"
                  >
                    Select Image
                  </Button>
                </Col>
                <Col>
                  <Button
                    onPress={() => handleFileClick("video")}
                    aria-label="Select Video"
                  >
                    Select Video
                  </Button>
                </Col>
              </Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>
            </Col>

            <div>
              <div className={"formStyle"}>
                {/* {localVideo && (
                  <video
                    key={localVideo}
                    width="320"
                    height="240"
                    controls
                    className={"videoStyle"}
                  >
                    <source src={localVideo} type="video/mp4" />
                  </video>
                )} */}
                {fileCost && (
                  <h4>
                    Cost to upload: {Math.round(fileCost * 1000) / 1000}{" "}
                    {toProperCase(currency)}
                  </h4>
                )}
                {/* <button className={"buttonStyle"} onClick={uploadFile}>Upload Video</button> */}
                <Row
                  className="form-control"
                  justify="center"
                  align="center"
                  gap={1}
                >
                  <Input
                    id="title"
                    className="input input-bordered"
                    labelPlaceholder="Make a Title"
                    status="secondary"
                    aria-label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    s
                    required
                  />
                </Row>
                <Spacer y={2} />
                <Row
                  className="form-control"
                  justify="center"
                  align="center"
                  gap={1}
                >
                  <Textarea
                    id="Description"
                    aria-label="description"
                    className="textarea textarea-bordered"
                    labelPlaceholder="Give a description"
                    status="secondary"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Row>
                <Spacer y={2} />
                <Row
                  className="form-control"
                  justify="center"
                  align="center"
                  gap={1}
                >
                  <Dropdown>
                    <Dropdown.Button>
                      {topics ? toProperCase(topics) : "Add a Tag"}
                    </Dropdown.Button>
                    <Dropdown.Menu onAction={(key) => setTopics(key)}>
                      {tagSelectOptions.map((v) => {
                        return (
                          <Dropdown.Item key={v.value}>
                            {toProperCase(v.value)}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
                <Spacer y={1} />
                <Row justify="center" align="center" gap={1}>
                  <Button onPress={doDeploy}>DEPLOY ATOMIC VIDEO</Button>
                </Row>
              </div>
            </div>
          </Col>

          <Col className="wallet">
            <h4>Step 3</h4>
            <IMG />
          </Col>
        </Row>
      </div>
    </>
  );
}
