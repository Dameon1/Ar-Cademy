import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context";
import { utils } from "ethers";
import BigNumber from "bignumber.js";
import fileReaderStream from "filereader-stream";
import "./upload.css";
import { AMW } from "../../utils/api";
import { currencyMap } from "../../utils/index";
import { WebBundlr } from "@bundlr-network/client";
import { sleep } from "@bundlr-network/client/build/common/upload";
import TestModal from "../../components/Modals/TestModal";
import { WarpFactory } from "warp-contracts";
import { deploy, deployBundlr } from "../../lib/imgLib/deploy-path.js";
import {
  Container,
  Button,
  Image,
  Spacer,
  Input,
  Dropdown,
  Row,
  Col,
  Textarea,
} from "@nextui-org/react";
import { providers } from "ethers";

import { connect, keyStores, WalletConnection } from "near-api-js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

import {} from "@nextui-org/react";
import { FaSleigh } from "react-icons/fa";

//import image from "../../favicon.png";
//import image from "../../winstonMedia.png";

export const tagSelectOptions = [
  { value: "learn", label: "Learn" },
  { value: "deployment", label: "Deployment" },
  { value: "build", label: "Build" },
  { value: "storage", label: "Storage" },
  { value: "apis", label: "API's" },
  { value: "tokenomics", label: "Tokenomics" },
  { value: "identity", label: "Identity" },
  { value: "arfs", label: "ArFS" },
  { value: "meme", label: "Meme" },
];

export default function Upload() {
  const image =
    "https://arweave.net/LQ070fmMUlAD1zBxqh3UmGF5WHMAiq-JKDjPVcl8W0M";
  const video =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const { addr } = useContext(MainContext);
  const defaultCurrency = "Currency";
  const [currency, setCurrency] = useState(defaultCurrency);

  //bundlr instance and address
  const [bundlrInstance, setBundlrInstance] = useState();
  const [address, setAddress] = useState("");

  //file vairables
  const [file, setFile] = useState();
  const [size, setSize] = useState();

  //original file variables
  const [originalImage, setOriginalImage] = useState();
  const [originalVideo, setOriginalVideo] = useState();
  const [originalFile, setOriginalFile] = useState();

  //Url variables for playback
  const [localVideo, setLocalVideo] = useState(video);
  const [localImage, setLocalImage] = useState(image);

  //Upload stream for bundlr
  const [imgStream, setImgStream] = useState(undefined);

  //2 variable for cost Image and Video and total cost
  const [imageCost, setImageCost] = useState(0);
  const [videoCost, setVideoCost] = useState(0);
  const [fileCost, setFileCost] = useState(imageCost + videoCost);

  //metadata variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [urls, setUrls] = useState([]);
  const [externalLinks, setExternalLinks] = useState([
    { value: "https://arwiki.wiki/#/en/creating-a-dapp", label: "arwiki" },
  ]);
  const [externarLinkTitle, setExternalLinkTitle] = useState([
    { value: "https://arwiki.wiki/#/en/creating-a-dapp", label: "arwiki" },
  ]);
  const [mimeType, setMimeType] = useState();

  //upload variables
  const [totalUploaded, setTotalUploaded] = useState(0);
  const [lastUploadId, setLastUploadId] = useState(undefined);

  const navigate = useNavigate();

  function toast(x) {
    return console.log(x);
  }

  const clean = async () => {
    setBundlrInstance(undefined);
    setOriginalFile(undefined);
    setLocalVideo(video);
    setLocalImage(image);
    setAddress("");
    setCurrency(defaultCurrency);
    setImgStream(undefined);
    setTotalUploaded(0);
    setLastUploadId(undefined);
    setExternalLinks([
      { value: "https://arwiki.wiki/#/en/creating-a-dapp", label: "arwiki" },
    ]);
    setExternalLinkTitle([]);
    setImageCost(0);
    setVideoCost(0);
    setFileCost(0);
    setTitle("");
    setDescription("");
    setUrls([]);
  };

  async function handleCurrencyChange(currency) {
    clean();
    setCurrency(currency);
  }
  const handleUrlSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const label = formData.get("label");
    const url = formData.get("url");
    setUrls([...urls, { label, url }]);
  };
  const handleUrlRemove = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  //returns
  function canDeploy() {
    return (
      addr?.length > 0 &&
      currency?.length > 0 &&
      originalImage !== null &&
      originalVideo !== null &&
      title?.length > 0 &&
      description?.length > 0 &&
      topics &&
      urls?.length > 0
    );
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

  async function checkUploadCost(bytes, type) {
    if (bytes) {
      const cost = await bundlrInstance.getPrice(bytes);
      console.log("currentCost", cost);
      if (type === "image")
        setImageCost(bundlrInstance.utils.unitConverter(cost).toString());
      if (type === "video")
        setVideoCost(bundlrInstance.utils.unitConverter(cost).toString());

      setFileCost(bundlrInstance.utils.unitConverter(cost).toString());
      return cost;
    }
  }

  const toProperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  };

  const connectWeb3 = async (connector) => {
    const p = new providers.Web3Provider(connector);
    await p._ready();
    return p;
  };

  const connectorMap = {
    MetaMask: async (opts) => {
      if (!window?.ethereum?.isMetaMask) return;
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = await connectWeb3(window.ethereum);
      const chainId = `0x${opts.chainId.toString(16)}`;
      try {
        // additional logic for requesting a chain switch and conditional chain add.
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (e) {
        if (e.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                rpcUrls: opts.rpcUrls,
                chainName: opts.chainName,
              },
            ],
          });
        }
      }
      const bundlr = new WebBundlr(
        "https://node2.bundlr.network",
        currency,
        provider
      );

      try {
        // Check for valid bundlr node
        await bundlr.utils.getBundlerAddress(currency);
      } catch {
        toast({
          status: "error",
          title: `Failed to connect to bundlr https://node2.bundlr.network`,
          duration: 10000,
        });
        return;
      }
      try {
        await bundlr.ready();
      } catch (err) {
        console.log(err);
      } //@ts-ignore
      if (!bundlr.address) {
        console.log("something went wrong");
      }
      toast({
        status: "success",
        title: `Connected to https://node2.bundlr.network`,
      });
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
        await connectorMap.Phantom();
        break;
      case "near":
        await connectorMap.Near();
        break;
      case "arweave":
        console.log("connectArweave");
        break;
      default:
        await connectorMap.MetaMask(currencyMap[currency].opts);
    }
  }

  async function doDeploy(e) {
    try {
      console.log("step 1: fund upload");
      const price = await bundlrInstance.getPrice(originalFile.size);
      const balance = await bundlrInstance.getLoadedBalance();
      const uploadCost = utils.formatEther(
        price.minus(balance).multipliedBy(1.1).toFixed(0)
      );
      if (balance.isLessThan(price)) {
        await bundlrInstance.fund(
          price.minus(balance).multipliedBy(1.1).toFixed(0)
        );
      }

      console.log("step 2: Create transaction");

      console.log("step 3: Sign Transaction");
      const trx = bundlrInstance.createTransaction(file, {
        tags: [{ name: "Content-Type", value: originalFile.type }],
      });
      await trx.sign();
      const result = await trx.upload();

      console.log("step 4: Upload Transaction");
      uploadFile();
      //   console.log("Uploaded");
      console.log(
        "DEPLOY BUNDLR PROPS",
        title,
        description,
        addr,
        originalFile.type,
        lastUploadId,
        topics,
        uploadCost
      );

      console.log("step 5: Deploy Bundlr");
      //   const result2 = await deployBundlr(
      //     title,
      //     description,
      //     addr,
      //     originalFile.type,
      //     result.data.id,
      //     topics,
      //     uploadCost
      //   );
      //   console.log("Finalized");
      //   alert("success");
      //   setTimeout(() => {
      //     navigate(`/AssetManagement/${result2.id}`);
      //   }, 2000);
    } catch (e) {
      console.log(e);
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
    const uploadCost = await checkUploadCost(eventFile.size, type);
    console.log("uploadCost", uploadCost);

    if (type === "image") {
      let reader = new FileReader();
      //const fileUrl = URL.createObjectURL(eventFile);
      reader.onload = function () {
        if (reader.result) {
          setFile(Buffer.from(reader.result));
        }
      };
      reader.readAsArrayBuffer(eventFile);
      setLocalImage(URL.createObjectURL(eventFile));
      setOriginalImage(eventFile);
    }
    if (type === "video") {
      setLocalVideo(URL.createObjectURL(eventFile));
      setOriginalVideo(eventFile);
      setMimeType(eventFile?.type ?? "application/octet-stream");
      setSize(eventFile?.size ?? 0);
      setImgStream(fileReaderStream(eventFile));
    }
    // setOriginalFile(eventFile);
    // let reader = new FileReader();
    // //const fileUrl = URL.createObjectURL(eventFile);
    // reader.onload = function () {
    //   if (reader.result) {
    //     setFile(Buffer.from(reader.result));
    //   }
    // };
    // reader.readAsArrayBuffer(eventFile);
  };

  const uploadFile = async () => {
    console.log("step 1: fund upload");
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const price = await bundlrInstance.getPrice(
      originalImage.size + originalVideo.size
    );
    const balance = await bundlrInstance.getLoadedBalance();
    const uploadCost = utils.formatEther(
      price.minus(balance).multipliedBy(1.2).toFixed(0)
    );
    if (balance.isLessThan(price)) {
      await bundlrInstance.fund(
        price.minus(balance).multipliedBy(1.2).toFixed(0)
      );
    }
    const trx = bundlrInstance.createTransaction(file, {
      tags: [{ name: "Content-Type", value: originalImage.type }],
    });
    const msgParams = JSON.stringify({
      message: {
        content: "test",
      },
    });
    await trx.sign({ msgParams });
    const result = await trx.upload();
    console.log("result", result);
    const contractTags = [
      { name: "Content-Type", value: originalVideo.type },
      { name: "App-Name", value: "SmartWeaveContract" },
      { name: "App-Version", value: "0.3.0" },
      {
        name: "Contract-Src",
        value: "x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs",
      },
      {
        name: "Init-State",
        value: JSON.stringify({
          ticker: "ATOMIC-ASSET-" + title,
          claimable: [],
          claims: [],
          contentType: originalVideo.type,
          emergencyHaltWallet: addr,
          pairs: [],
          uploadCost: uploadCost,
          currencyUsed: currency,
          invocations: [],
          foreignCalls: [],
          settings: [["isTradeable", true]],
          owner: addr,
          canEvolve: true,
          balances: {
            [addr]: 10000,
          },
          wallets: {},
          externalLinks: JSON.stringify({ links: urls }),
        }),
      },
      { name: "Title", value: title },
      { name: "Description", value: description },
      { name: "Type", value: originalVideo.type },
      { name: "Topics", value: topics },
      { name: "Upload-Cost", value: uploadCost },
      {
        name: "External-Links",
        value: JSON.stringify({ links: urls }),
      },
      { name: "Video-Image-Id", value: result.id },
      { name: "Platform", value: "Arcademy-Test" },
    ];

    if (imgStream) {
      toast({ title: "Starting upload...", status: "info" });
      setTotalUploaded(0);
      setLastUploadId(undefined);
      await sleep(2_000); // sleep as this is all main thread (TODO: move to web worker?)
      const uploader = bundlrInstance?.uploader.chunkedUploader;
      uploader?.setBatchSize(2);
      uploader?.setChunkSize(2_000_000);
      uploader?.on("chunkUpload", (e) => {
        setTotalUploaded(e.totalUploaded);
      });
      //@ts-ignore
      uploader
        ?.uploadData(imgStream, {
          tags: contractTags,
        })
        .then(async (res) => {
          //remove this when new warp is deployed
          const result2 = await deployBundlr(
            title,
            description,
            addr,
            originalVideo.type,
            res.data.id,
            topics,
            uploadCost,
            currency,
            urls,
            result.id
          );
          console.log("Finalized");
          alert("success");
          setTimeout(() => {
            navigate(`/AssetManagement/${result2.id}`);
          }, 1000);

          alert(`https://arweave.net/${result2.id}`);

          // THIS CODE IS FOR NEW WARP
          // console.log("res", res);
          // const warp = WarpFactory.forMainnet();
          // const { contractTxId } = await warp.register(res.data.id, "node2");
          // console.log(`Check the data: https://arweave.net/${contractTxId}`);
          // setLastUploadId(res.data.id);
          // setTimeout(() => {
          //   navigate(`/AssetManagement/${res.data.id}`);
          // }, 5000);
          // alert(`https://arweave.net/${res.data.id}`);
        })
        .catch((e) => {
          toast({ status: "error", title: `Failed to upload - ${e}` });
        });
    }
  };

  return (
    <main>
      <div>
        <Container>
          <Row align="center">
            <div className="text-container">
              <h2>Ar-Cademy Uploads</h2>
              <p className="pText">
                This is a work in progress. Experimenting with the spectrum of
                uploads on Arweave. These range from simple string metadata
                stored directly on Arweave completely, to a range of NFT
                capabilities that store on Ardrive, can be managed on Darkblock
                or Koii Network, that includes serving the content through the
                Meson Networks CDN Polygon contract and uses the new WARP
                contracts from Redstone.
              </p>
            </div>
          </Row>
        </Container>
        <Spacer y={1} />
        <Row align="center" justify="center">
          <TestModal />
        </Row>
        <Spacer y={1} />
        <Container
          justify="center"
          align="center"
          className="uploadContainer"
          xs
        >
          <Spacer y={0.25} />
          <Row justify="center" align="center">
            <Col>
              <h3>Step 1: Payment prep</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Button
                  css={{
                    color: "black",
                    border: "2px solid #008c9e",
                    fontSize: "0.75em",
                    padding: "0.3em",
                    backgroundColor: "white",
                    transition: "all 0.2s ease-in-out",
                  }}
                  className="button buttonText"
                >
                  <p className="pText">{toProperCase(currency)}</p>
                </Dropdown.Button>
                <Dropdown.Menu onAction={(key) => handleCurrencyChange(key)}>
                  {Object.keys(currencyMap).map((v) => {
                    return (
                      <Dropdown.Item key={v} className="buttonText">
                        {toProperCase(v)}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Button
                auto
                css={{
                  color: "black",
                  border: "2px solid #008c9e",
                  fontSize: "0.75em",
                  padding: "0.3em",
                  backgroundColor: "white",
                  transition: "all 0.2s ease-in-out",
                }}
                disabled={currency === defaultCurrency}
                className="button buttonText"
                onPress={
                  bundlrInstance
                    ? () => clean()
                    : async () => await initializeBundlr()
                }
                color={bundlrInstance ? "warning" : "gradient"}
              >
                <p className="pText">{bundlrInstance ? "Reset" : "Connect"}</p>
              </Button>
              <Spacer y={0.5} />
            </Col>
          </Row>
          <Row align="center">
            <Col>
              <p className="pText">
                {currency !== defaultCurrency
                  ? `${toProperCase(currency)} Account:${address.slice(0, 4)}`
                  : null}
              </p>
            </Col>
          </Row>
        </Container>
        <Spacer y={1} />
        <Container
          justify="center"
          align="center"
          className="uploadContainer"
          xs
        >
          <Spacer y={0.25} />
          <Row justify="center" align="center">
            <Col>
              <h3>Step 2: Media</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                auto
                disabled={currency === defaultCurrency}
                css={{
                  color: "black",
                  border: "2px solid #008c9e",
                  fontSize: "0.75em",
                  padding: "0.3em",
                  backgroundColor: "white",
                  transition: "all 0.2s ease-in-out",
                }}
                onPress={() => handleFileClick("image")}
                aria-label="Select Image"
                className="button buttonText"
              >
                <p className="pText">Image</p>
              </Button>
              <p className="pText">Preview</p>
              <Col>
                <Image
                  src={localImage ? localImage : image}
                  alt="your upload here"
                  objectFit="contain"
                  width={160}
                  height={160}
                />
                <Spacer y={0.5} />
                <h4>Cost: {Math.round(imageCost * 100000) / 100000}</h4>
              </Col>
            </Col>
            <Spacer x={0.5} />
            <Col>
              <Button
                auto
                disabled={currency === defaultCurrency}
                css={{
                  color: "black",
                  border: "2px solid #008c9e",
                  fontSize: "0.75em",
                  padding: "0.3em",
                  backgroundColor: "white",
                  transition: "all 0.2s ease-in-out",
                }}
                onPress={() => handleFileClick("video")}
                aria-label="Select Video"
                className="button buttonText"
              >
                <p className="pText">Video</p>
              </Button>
              <p className="pText">Preview</p>
              <video key={localVideo} width={160} height={160} controls>
                <source src={localVideo} />
              </video>
              <h4>Cost: {Math.round(videoCost * 100000) / 100000}</h4>
            </Col>
          </Row>
          <Spacer y={0.5} />
          <Row justify="center" align="center">
            <h3>
              Total Cost:{" "}
              {Math.round(imageCost * 100000) / 100000 +
                Math.round(videoCost * 100000) / 100000}
            </h3>
          </Row>
        </Container>
        <Spacer y={1} />
        <Container
          justify="center"
          align="center"
          className="uploadContainer"
          xs
        >
          <Spacer y={0.25} />
          <Row justify="center" align="center">
            <Col>
              <h3>Step 3: Add Extras</h3>
            </Col>
          </Row>
          <div>
            <div>
              <Row
                className="form-control"
                justify="center"
                align="center"
                gap={1}
              >
                <Col>
                  <Input
                    id="title"
                    className="input input-bordered"
                    labelPlaceholder="Make a Title"
                    status="secondary"
                    aria-label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    clearable
                  />
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Button
                      css={{
                        color: "black",
                        border: "2px solid #008c9e",
                        fontSize: "0.75em",
                        padding: "0.3em",
                        backgroundColor: "white",
                        transition: "all 0.2s ease-in-out",
                      }}
                      className="button buttonText"
                    >
                      <p className="pText">
                        {topics ? toProperCase(topics) : "Add a Tag"}
                      </p>
                    </Dropdown.Button>
                    <Dropdown.Menu onAction={(key) => setTopics(key)}>
                      {tagSelectOptions.map((v) => {
                        return (
                          <Dropdown.Item key={v.value} className="buttonText">
                            <p className="pText">{toProperCase(v.value)}</p>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Spacer x={0.5} />
                <Col
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
                    clearable
                  />
                </Col>
                <Spacer x={0.5} />
              </Row>
              <Spacer y={1} />
              <Row justify="center" align="center" gap={1}>
                <h3>Add External Links:</h3>
              </Row>
              <Row justify="center" align="center" gap={1}>
                <Col>
                  <Row justify="center" align="center" gap={1}>
                    <p className="pText">Add up to 5</p>
                  </Row>
                  <Row justify="center" align="center" gap={1}>
                    <p className="pText">URLs: {urls.length}/5</p>
                  </Row>

                  <form onSubmit={handleUrlSubmit}>
                    <Input
                      type="text"
                      name="label"
                      id="label"
                      aria-label="description"
                      className="input input-bordered"
                      labelPlaceholder="URL Label"
                      status="secondary"
                      required
                      clearable
                    />
                    <Spacer y={1} />
                    <Input
                      type="text"
                      id="url"
                      name="url"
                      aria-label="add url"
                      className="input input-bordered"
                      labelPlaceholder="Add URL"
                      status="secondary"
                      required
                      clearable
                    />
                    <Spacer y={1} />
                    <Button
                      type="submit"
                      disabled={urls.length === 5}
                      css={{
                        color: "black",
                        border: "2px solid #008c9e",
                        fontSize: "0.75em",
                        padding: "0.3em",
                        backgroundColor: "white",
                        transition: "all 0.2s ease-in-out",
                      }}
                      className="button buttonText"
                    >
                      <p className="pText">Add URL</p>
                    </Button>
                    <Spacer y={1} />
                  </form>

                  {urls.map((url, index) => (
                    <div key={index}>
                      <Row wrap="no-wrap">
                        <p className="pText">
                          {url.label}: {url.url}
                        </p>
                      </Row>
                      <Button
                        css={{
                          color: "black",
                          border: "2px solid #008c9e",
                          fontSize: "0.75em",
                          padding: "0.3em",
                          backgroundColor: "white",
                          transition: "all 0.2s ease-in-out",
                        }}
                        className="button buttonText"
                        type="button"
                        onClick={() => handleUrlRemove(index)}
                      >
                        <p className="pText">Remove</p>
                      </Button>
                    </div>
                  ))}
                </Col>
                <Col>
                  <Row justify="center" align="center" gap={1}>
                    <p className="pText">URL Preview</p>
                  </Row>
                  <iframe
                    src={
                      urls.length === 0
                        ? "https://weavedb.dev/"
                        : urls[urls.length - 1].url
                    }
                    title={
                      urls.length === 0
                        ? "Placeholder Preview"
                        : urls[urls.length - 1].label
                    }
                    height="250"
                    width="350"
                  />
                </Col>
              </Row>
              <Spacer y={0.5} />
              <Row justify="center" align="center" gap={1}>
                <Button
                  disabled={canDeploy() ? false : true}
                  css={{
                    color: "black",
                    border: "2px solid #008c9e",
                    fontSize: "0.75em",
                    padding: "0.3em",
                    backgroundColor: "white",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onPress={uploadFile}
                  className="button buttonText"
                >
                  <p className="pText">DEPLOY ATOMIC ASSET</p>
                </Button>
              </Row>
              {console.log(canDeploy())}
              <Spacer y={0.5} />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
