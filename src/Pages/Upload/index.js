import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context";
import { utils } from "ethers";
import BigNumber from "bignumber.js";
import "./upload.css";
import { AMW } from "../../utils/api";
import { currencyMap } from "../../utils/index";
import { deploy, deployBundlr } from "../../lib/imgLib/deploy-path.js";
import { WebBundlr } from "@bundlr-network/client";

import {
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

import image from "../../favicon.png";

export const tagSelectOptions = [
  { value: "daos", label: "DAOs" },
  { value: "defi", label: "DeFi" },
  { value: "nfts", label: "NFTs" },
  { value: "developers", label: "Developers" },
  { value: "gaming", label: "Gaming" },
  { value: "investing", label: "Investing" },
  { value: "public-goods", label: "Public Goods" },
  { value: "education", label: "Education" },
  { value: "meme", label: "Meme" },
];

export default function Upload() {
  const { addr } = useContext(MainContext);
  const defaultCurrency = "Select a Currency";
  const [currency, setCurrency] = useState(defaultCurrency);

  //bundlr instance and address
  const [bundlrInstance, setBundlrInstance] = useState();
  const [address, setAddress] = useState("");

  const [originalFile, setOriginalFile] = useState();
  //readAsArrayBuffer file
  const [file, setFile] = useState();

  const [fileCost, setFileCost] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");
  //todo
  //const [externalLinks, setExternalLinks] = useState("");

  const [localVideo, setLocalVideo] = useState();

  const navigate = useNavigate();

  function toast(x) {
    return console.log(x);
  }

  const clean = async () => {
    setBundlrInstance(undefined);
    setOriginalFile(undefined);
    setLocalVideo([]);
    setFileCost("");
    setAddress("");
    setCurrency(defaultCurrency);
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

  async function checkUploadCost(bytes) {
    if (bytes) {
      const cost = await bundlrInstance.getPrice(bytes);
      console.log(cost);
      setFileCost(bundlrInstance.utils.unitConverter(cost).toString());
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
      await window.ethereum.enable();
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
    console.log("currency:", currency);
    try {
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

      const trx = bundlrInstance.createTransaction(file, {
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
      alert("success");
      setTimeout(() => {
        navigate(`/AssetManagement/${result2.id}`);
      }, 2000);
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
    checkUploadCost(eventFile.size);
    setOriginalFile(eventFile);
    let reader = new FileReader();
    const fileUrl = URL.createObjectURL(eventFile);
    reader.onload = function () {
      if (reader.result) {
        setFile(Buffer.from(reader.result));
      }
    };
    reader.readAsArrayBuffer(eventFile);
    if (type === "video") {
      setLocalVideo(fileUrl);
    }
  };

  return (
    <main>
      <div>
        <Row align="center" >
            <div className="text-container">
              <h2>Welcome to Ar-Cademy</h2>
              <p className="site-introduction">
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
        <Row justify="flex-wrap" wrap="wrap">
          <Col className="uploadContainer">
            <h4>Step 1</h4>
            <p className={"labelStyle"}>Payment prep</p>
            <Col justify="center" align="center" gap={1}>
              <Row justify="center" align="center">
                <Col className="form-control">
                  <Dropdown>
                    <Dropdown.Button className="buttonText">{toProperCase(currency)}</Dropdown.Button>
                    <Dropdown.Menu
                      onAction={(key) => handleCurrencyChange(key)}
                    >
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
                    disabled={currency === defaultCurrency}
                    className="buttonText"
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
                {originalFile?.type.split("/")[0] === "image" ? (
                  <Col>
                    <Image
                      src={URL.createObjectURL(originalFile)}
                      alt="your upload here"
                      objectFit="contain"
                      width={160}
                      height={160}
                    />
                  </Col>
                ) : originalFile?.type.split("/")[0] === "video" ? (
                  <></>
                ) : (
                  <Col>
                    <img
                      src={image}
                      alt="Winston"
                      objectFit="contain"
                      width={160}
                      height={160}
                    />
                  </Col>
                )}
                {originalFile?.type.split("/")[0] === "video" ? (
                  <Col>
                    {localVideo && (
                      <video
                        key={localVideo}
                        width="240"
                        height="180"
                        controls
                        className={"videoStyle"}
                      >
                        <source src={URL.createObjectURL(originalFile)} />
                      </video>
                    )}
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
              <Spacer y={0.5} />
              <Row>
                <Col>
                  <Button
                    onPress={() => handleFileClick("image")}
                    aria-label="Select Image"
                    className="buttonText"
                  >
                    Select Image
                  </Button>
                </Col>
                <Col>
                  <Button
                    onPress={() => handleFileClick("video")}
                    aria-label="Select Video"
                    className="buttonText"
                  >
                    Select Video
                  </Button>
                </Col>
              </Row>
            </Col>

            <div>
              <div className={"formStyle"}>
                {fileCost && (
                  <h4>
                    Cost to upload: {Math.round(fileCost * 100000) / 100000}
                    {` in ${currency}`}
                    {console.log(parseInput(fileCost))}
                  </h4>
                )}
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
                    <Dropdown.Button className="buttonText">
                      {topics ? toProperCase(topics) : "Add a Tag"}
                    </Dropdown.Button>
                    <Dropdown.Menu onAction={(key) => setTopics(key)}>
                      {tagSelectOptions.map((v) => {
                        return (
                          <Dropdown.Item key={v.value} className="buttonText">
                            {toProperCase(v.value)}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
                <Spacer y={1} />
                <Row justify="center" align="center" gap={1}>
                  <Button onPress={doDeploy} className="buttonText">DEPLOY ATOMIC VIDEO</Button>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
