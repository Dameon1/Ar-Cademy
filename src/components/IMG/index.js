import { useState } from "react";
import { providers } from "ethers";
import * as nearAPI from "near-api-js";
import {
  Button,
  Textarea,
  Spacer,
  Input,
  Dropdown,
  Container,
  Row,
  Col,
} from "@nextui-org/react";

import { useNavigate } from "react-router-dom";

//import { deploy, deployBundlr } from "../../lib/stampLib/deploy-path.js";
import { deploy, deployBundlr } from "../../lib/imgLib/deploy-path.js";

import image from "../../assets/favicon.ico";

//   import DeployDialog from "../dialogs/deploy.svelte";
//   import ErrorDialog from "../dialogs/error.svelte";
//   import ConfirmDialog from "../dialogs/confirm.svelte";
//import { imgCache } from "../store.js";

import { WebBundlr } from "@bundlr-network/client";
//const WebBundlr = Bundlr.default;
import { AMW } from "../../utils/api";

export default function IMG() {
  const { connect, keyStores, WalletConnection } = nearAPI;
  const [imgCache, setImgCache] = useState([]);
  const [files, setFiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [currency, setCurrency] = useState("");
  const [tx, setTx] = useState("");
  const NEAR_OPTS = {
    networkId: "mainnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
  };
  const navigate = useNavigate();

  //let files = [];
  //   let title = "";
  //   let description = "";
  //   let topics = "";
  //   let deployDlg = false;
  //   let errorMessage = "";
  //   let errorDlg = false;
  //   let confirmDlg = false;

  // const c = (event) => {
  //   console.log(event.target.value);
  //   setFiles(event.target.value);
  // };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const changeTopics = (event) => {
    setTopics(event.target.value);
  };

  // const changeTx = (event) => {
  //   setTx(event.target.value);
  // };

  // const changeCurrency = (event) => {
  //   setCurrency(event.target.value);
  // };

  // const changeFile = () => {
  //   var fileInputEl = document.createElement("input");
  //   fileInputEl.type = "file";
  //   fileInputEl.accept =
  //     "image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml";
  //   fileInputEl.style.display = "none";
  //   document.body.appendChild(fileInputEl);
  //   fileInputEl.addEventListener("input", function (e) {
  //     changeFile(e);
  //     document.body.removeChild(fileInputEl);
  //   });
  //   fileInputEl.click();
  // };

  const handleFileClick = () => {
    var fileInputEl = document.createElement("input");
    fileInputEl.type = "file";
    fileInputEl.accept =
      "image/* image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml";
    fileInputEl.style.display = "none";
    document.body.appendChild(fileInputEl);
    fileInputEl.addEventListener("input", function (e) {
      handleUpload(e);
      document.body.removeChild(fileInputEl);
    });
    fileInputEl.click();
  };

  const handleUpload = async (evt) => {
    let files = evt.target.files;
    setFiles(evt.target.files);
    previewImage(evt);

    let reader = new FileReader();
    if (files && files.length > 0) {
      reader.onload = function () {
        if (reader.result) {
          //setFiles(Buffer.from(reader.result));
        }
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  function showError(msg) {
    console.log("error:", msg);
  }

  const toArrayBuffer = (file) =>
    new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.readAsArrayBuffer(file);
      fr.addEventListener("loadend", (evt) => {
        resolve(evt.target.result);
      });
    });

  async function doDeploy(e) {
    e.preventDefault();
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
          "matic",
          provider
        );

        await bundlr.ready();

        // fund account
        const price = await bundlr.getPrice(files[0].size);
        const balance = await bundlr.getLoadedBalance();

        if (balance.isLessThan(price)) {
          await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
        }

        const trx = bundlr.createTransaction(await toArrayBuffer(files[0]), {
          tags: [{ name: "Content-Type", value: files[0].type }],
        });

        await trx.sign();

        const result = await trx.upload();

        const addr = "zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE";
        console.log(
          "DEPLOY BUNDLR PROPS",
          title,
          description,
          addr,
          files[0].type,
          result.data.id,
          topics
        );
        const result2 = await deployBundlr(
          title,
          description,
          addr,
          files[0].type,
          result.data.id,
          topics
        );
        console.log("Completed Upload, redirecting 3...");
        // reset form
        document.forms[0].reset();
        console.log("Completed Upload, redirecting 2...");

        setTx(result2.id);
        console.log("Completed Upload, redirecting 1...");

        setImgCache([
          ...imgCache,
          { id: result2.id, src: URL.createObjectURL(files[0]) },
        ]);
        console.log(`https://ar-io.net/${result.data.id}`);
        console.log("Completed Upload, redirecting ...");

        setTimeout(() => {
          navigate("/testpage");
        }, 2000);
      } catch (e) {
        console.log(e);
      }
      // } else if (currency === "near") {
      //   /** wip
      //    * need to handle redirect for success and failure
      //    * the connect process leaves the app, so upon redirect
      //    * we need to reconnect to arweave wallet and ingest the
      //    * redirect information. Then restore the upload info for
      //    * the img form.
      //    */
      //   deployDlg = true;
      //   const near = await connect(NEAR_OPTS);
      //   const provider = new WalletConnection(near, "bundlr");
      //   await provider.requestSignIn("img", "img.arweave.dev");

      //   const bundlr = new WebBundlr(
      //     "https://node2.bundlr.network",
      //     "near",
      //     provider
      //   );
      //   await bundlr.ready();

      //   // fund account
      //   const price = await bundlr.getPrice(files[0].size);
      //   const balance = await bundlr.getLoadedBalance();

      //   if (balance.isLessThan(price)) {
      //     await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
      //   }

      //   const trx = await bundlr.createTransaction(
      //     await toArrayBuffer(files[0]),
      //     {
      //       tags: [{ name: "Content-Type", value: files[0].type }],
      //     }
      //   );

      //   await trx.sign();

      //   const result = await trx.upload();

      //   const addr = await AMW.getActiveAddress();

      //   const result2 = await deployBundlr(
      //     title,
      //     description,
      //     addr,
      //     files[0].type,
      //     result.data.id,
      //     topics
      //   );

      //   deployDlg = false;

      //   // reset form
      //   document.forms[0].reset();

      //   setTx(result2.id);

      //   setImgCache([
      //     ...imgCache,
      //     { id: result2.id, src: URL.createObjectURL(files[0]) },
      //   ]);

      //   confirmDlg = true;
      // } else if (currency === "sol") {
      //   if (!window.solana) {
      //     showError("Phantom Wallet is required!");
      //     return;
      //   }
      //   try {
      //     deployDlg = true;
      //     await window.solana.connect();
      //     const provider = new PhantomWalletAdapter();
      //     await provider.connect();

      //     const bundlr = new WebBundlr(
      //       "https://node2.bundlr.network",
      //       "solana",
      //       provider
      //     );
      //     await bundlr.ready();
      //     // fund account
      //     const price = await bundlr.getPrice(files[0].size);
      //     const balance = await bundlr.getLoadedBalance();

      //     if (balance.isLessThan(price)) {
      //       await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
      //     }

      //     const trx = await bundlr.createTransaction(
      //       await toArrayBuffer(files[0]),
      //       {
      //         tags: [{ name: "Content-Type", value: files[0].type }],
      //       }
      //     );

      //     await trx.sign();

      //     const result = await trx.upload();

      //     const addr = await AMW.getActiveAddress();

      //     const result2 = await deployBundlr(
      //       title,
      //       description,
      //       addr,
      //       files[0].type,
      //       result.data.id,
      //       topics
      //     );

      //     deployDlg = false;

      //     // reset form
      //     document.forms[0].reset();

      //     setTx(result2.id);

      //     setImgCache([
      //       ...imgCache,
      //       { id: result2.id, src: URL.createObjectURL(files[0]) },
      //     ]);

      //     confirmDlg = true;
      //   } catch (e) {
      //     //console.log(e);
      //     deployDlg = false;
      //     showError("Could not upload using SOL, check your SOL balance.");
      //   }
      // } else {
      //   if (!window.arweaveWallet) {
      //     errorMessage = "Arweave Wallet not found!";
      //     errorDlg = true;
      //     return;
      //   }
      //   // connnect
      //   await AMW.connect([
      //     "ACCESS_ADDRESS",
      //     "SIGN_TRANSACTION",
      //     "DISPATCH",
      //   ]);
      //   const addr = await AMW.getActiveAddress();

      //   try {
      //     deployDlg = true;
      //     const data = await toArrayBuffer(files[0]);
      //     const result = await deploy(
      //       title,
      //       description,
      //       addr,
      //       files[0].type,
      //       data,
      //       topics
      //     );

      //     deployDlg = false;

      //     // reset form
      //     e.target.reset();
      //     // files = [];
      //     // title = "";
      //     // description = "";

      //     setTx(result.id);
      //     setImgCache([
      //       ...imgCache,
      //       { id: tx, src: URL.createObjectURL(files[0]) },
      //     ]);

      //     confirmDlg = true;
      //   } catch (e) {
      //     deployDlg = false;
      //     errorMessage = e.message;
      //     errorDlg = true;
      //   }
      // }
    }
  }
  //   $: notValid = !(
  //     files.length > 0 &&
  //     ["matic", "sol", "ar", "near"].includes(currency) &&
  //     title !== ""
  //   );

  const previewImage = (e) => {
    const preview = document.getElementById("preview");
    preview.src = URL.createObjectURL(e.target.files[0]);
    preview.onload = () => URL.revokeObjectURL(preview.src);
    //handleFileClick(e);
  };

  const ethProviders = ["MetaMask", "WalletConnect"];

  const currencyMap = {
    matic: {
      providers: ethProviders,
      opts: {
        chainId: 137,
        chainName: "Polygon Mainnet",
        rpcUrls: ["https://polygon-rpc.com"],
      },
    },
  };

  return (
    <>
      <main>
        <Container fluid>
          <Col justify="center" align="center" gap={1}>
            <div>
              <h4>Atomic Assets</h4>
              <form className="" onSubmit={doDeploy}>
                <Row justify="center" align="center" gap={1}>
                  <img
                    className="cardImage"
                    src={image}
                    id="preview"
                    alt="your upload here"
                  />
                </Row>
                <Row justify="center" align="center" gap={1}>
                  <Col justify="center" align="center">
                    <Button
                      css={{
                        color: "black",
                        border: "2px solid #008c9e",
                        fontSize: "0.75em",
                        padding: "0.3em",
                        backgroundColor: "white",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onClick={handleFileClick}
                      aria-label="Select file"
                    >
                      Select file from Device
                    </Button>
                  </Col>

                  {files[0] !== undefined && (
                    <Col justify="center" align="center">
                      <div className="mt-2 flex justify-end">
                        <Button
                          aria-label="Reset"
                          onClick={() => setFiles([])}
                          className="link buttonText"
                        >
                          clear
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>

                <Spacer y={2} />

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
                    onChange={changeTitle}
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
                    onChange={changeDescription}
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
                  <Input
                    id="topics"
                    aria-label="Data tags"
                    className="input input-bordered"
                    labelPlaceholder="Add a tag with a comma"
                    status="secondary"
                    onChange={changeTopics}
                    required
                  />
                </Row>
                <Spacer y={2} />
                <Row justify="center" align="center" gap={1}>
                  <Col className="form-control">
                    <Dropdown aria-label="Static Actions" required>
                      <Dropdown.Button>
                        {"Currency: "}
                        {currency}
                      </Dropdown.Button>
                      <Dropdown.Menu
                        onAction={(key) => setCurrency(key)}
                        aria-label="Static Actions"
                      >
                        {Object.keys(currencyMap).map((v) => {
                          return <Dropdown.Item key={v}>{v}</Dropdown.Item>; // proper/title case
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col>
                    <Button type="submit">Deploy</Button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Container>
      </main>

      {/* <DeployDialog open={deployDlg} />
      <ErrorDialog
          open={errorDlg}
         msg={errorMessage}
         on:cancel={() => (errorDlg = false)}
        />
      <ConfirmDialog {tx} open={confirmDlg} on:cancel={() => (confirmDlg = false)} /> */}
    </>
  );
}
