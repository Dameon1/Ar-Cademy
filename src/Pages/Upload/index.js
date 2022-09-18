import { useState, useContext } from "react";
import { MainContext } from "../../context";
import { utils } from "ethers";
import BigNumber from "bignumber.js";
import "./upload.css";
import { AMW } from "../../utils/api";
import Select from "react-select";
import BundlrDemo from "../../components/BundlrDemo/BundlrDemo";
import { Button } from '@nextui-org/react';

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

const APP_NAME = "Ar-cademy-Test";
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
  const {
    bundlrInstance,
    addr,
    setAddr,
    setWalletName,
    currency,
    setCurrency,
    walletName,
  } = useContext(MainContext);
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [fileCost, setFileCost] = useState(0);
  // const [uploadFileCost, setUploadFileCost] = useState();
  // const [withdrawAmount, setWithdrawAmount] = useState();
  const [description, setDescription] = useState("");
  const [tagSelectState, setTagSelectState] = useState();
  const [localVideo, setLocalVideo] = useState();
  const [URI, setURI] = useState();
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState(0);

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

  function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    checkUploadCost(file.size);
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
      const cost = await AMW.getPrice(bytes);
      setFileCost(utils.formatEther(cost.toString()));
    }
  }

  async function uploadFile() {
    if (!file) return;
    const tags = [{ name: "Content-Type", value: "video/mp4" }];
    try {
      let tx = await AMW.uploader(file, tags);
      setURI(`http://arweave.net/${tx.data.id}`);
    } catch (err) {
      console.log("Error uploading video: ", err);
    }
  }

  async function saveVideo() {
    if (!file || !title || !description) return;
    const tags = [
      { name: "Content-Type", value: "application/json" },
      { name: "App-Name", value: APP_NAME },
    ];

    if (tagSelectState) {
      tags.push({
        name: "Topic",
        value: tagSelectState.value,
      });
    }

    const video = {
      title,
      description,
      URI,
      createdAt: new Date(),
      createdBy: addr,
    };

    try {
      let tx = await AMW.createTransaction(JSON.stringify(video), { tags });
      await tx.sign()
      await tx.upload()

      console.log(`http://arweave.net/${tx.txid}`);
      setTimeout(() => {
        console.log("/redirect to new page displaying upload");
      }, 2000);
    } catch (err) {
      console.log("error uploading video with metadata: ", err);
    }
  }

  async function bundlr() {
    setAddr(await AMW.connect("bundlr"));
    setWalletName("bundlr");
  }

  if (walletName !== "bundlr") {
    return (
      <div>
        <div className={"selectContainerStyle"}>
          <Select
            onChange={({ value }) => setCurrency(value)}
            options={currencyOptions}
            defaultValue={{ value: currency, label: currency }}
            classNamePrefix="select"
            instanceId="currency"
          />
          <p>Currency: {currency}</p>
        </div>
        <div className={"containerStyle"}>
          <Button onPress={bundlr}>
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-container">
        <h2>Welcome to Ar-Cademy</h2>
        <p className="site-introduction">
          This is a work in progress. Experimenting with the spectrum of uploads
          on Arweave. These range from simple string metadata stored directly on
          Arweave completely, to a range of NFT capabilities that store on
          Ardrive, can be managed on Darkblock or Koii Network, that includes
          serving the content through the Meson Networks CDN Polygon contract
          and uses the new WARP contracts from Redstone.
        </p>
      </div>
      <div className="connection">
        
        <div className="wallet"
        >
          <h4>Step 1</h4>
          <p className={"labelStyle"}>Payment prep</p>
          <BundlrDemo />
          {/* <div className={"selectContainerStyle"}>
            <Select
              onChange={({ value }) => setCurrency(value)}
              options={currencyOptions}
              defaultValue={{ value: currency, label: currency }}
              classNamePrefix="select"
              instanceId="currency"
            />
          </div> */}
          {/* <div className={"bottomFormStyle"}>
            <p className={"labelStyle"}>Load Bundlr</p>
            <input
              placeholder="amount"
              className={"inputStyle"}
              onChange={(e) => setAmount(e.target.value)}
            />
            <h2>💰 Balance {balance}</h2>

          </div> */}
            {/* <h3 >💰 Balance {Math.round(balance * 100) / 100}</h3> */}
        </div>
        <div
          className="wallet"
        >
          <h4>Step 2</h4>
          <p className={"labelStyle"}>Preview and Start</p>
          <div className={"inputContainerStyle"}>
            <input type="file" onChange={onFileChange} />
          </div>
          {localVideo && (
            <video
              key={localVideo}
              width="220"
              controls
              className={"videoStyle"}
            >
              <source src={localVideo} type="video/mp4" />
            </video>
          )}
          {fileCost && (
            <h4>Cost to upload: {Math.round(fileCost * 1000) / 1000} MATIC</h4>
          )}
          <Button onPress={uploadFile}>
            Upload Video
          </Button>
        </div>

        <div
          className="wallet"
         
        >
          <h4>Step 3</h4>
          <p className={"labelStyle"}>Containerize and Finalise</p>
          <Button onPress={fundWallet}>
            Send transaction
          </Button>
        </div>
      </div>
      <div className={"formStyle"}>
        {URI && (
          <div>
            <p className={"linkStyle"}>
              <a href={URI}>{URI}</a>
            </p>
            <div className={"formStyle"}>
              <p className={"labelStyle"}>Tag (optional)</p>
              <Select
                options={tagSelectOptions}
                className={"selectStyle"}
                onChange={(data) => setTagSelectState(data)}
                isClearable
              />
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
              <Button  onPress={saveVideo}>
                Save Video
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

