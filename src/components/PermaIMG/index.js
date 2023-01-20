// import { useNavigate } from "react-router-dom";

// import { deploy, deployBundlr } from "../../lib/imgLib/deploy-path.js";
// import image from "../../assets/favicon.ico";

// import { WebBundlr } from "@bundlr-network/client";
// import { AMW } from "../../utils/api";

// import { useState, useRef } from "react";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// import * as nearAPI from "near-api-js";
// import {
//   Button,
//   Textarea,
//   Grid,
//   Loading,
//   Text,
//   Spacer,
//   Input,
//   Dropdown,
//   Tooltip,
//   Container,
//   Row,
//   Col,
// } from "@nextui-org/react";
// import BigNumber from "bignumber.js";
// import Select from "react-select";
// import { providers, utils } from "ethers";
// //import { css } from '@emotion/css'

// const APP_NAME = "Ar-Cademy";

// export const tagSelectOptions = [
//   { value: "daos", label: "DAOs" },
//   { value: "defi", label: "DeFi" },
//   { value: "nfts", label: "NFTs" },
//   { value: "developers", label: "Developers" },
//   { value: "gaming", label: "Gaming" },
//   { value: "investing", label: "Investing" },
//   { value: "public-goods", label: "Public Goods" },
//   { value: "education", label: "Education" },
// ];

// const supportedCurrencies = {
//   matic: "matic",
//   ethereum: "ethereum",
//   avalanche: "avalanche",
//   bnb: "bnb",
//   arbitrum: "arbitrum",
// };

// const currencyOptions = Object.keys(supportedCurrencies).map((v) => {
//   return {
//     value: v,
//     label: v,
//   };
// });

// export default function PermaIMG() {
//   //const { balance, bundlrInstance, fetchBalance, initialiseBundlr, currency, setCurrency } = useContext(MainContext)
//   const [file, setFile] = useState();
//   const [localVideo, setLocalVideo] = useState();
//   const [topics, setTopics] = useState("");

//   const [title, setTitle] = useState("");
//   const [fileCost, setFileCost] = useState();
//   const [description, setDescription] = useState("");
//   const [tagSelectState, setTagSelectState] = useState();
//   //const router = useRouter()

//   const [URI, setURI] = useState();
//   const [amount, setAmount] = useState();
//   const [imgCache, setImgCache] = useState([]);

//   const [bundlrInstance, setBundlrInstance] = useState();
//   const [balance, setBalance] = useState(0);
//   const [currency, setCurrency] = useState("matic");
//   const [originalFile, setOriginalFile] = useState();
//   const [fileSizeBytes, SetFileSizeBytes] = useState(0)
//   const bundlrRef = useRef();

//   const navigate = useNavigate();
  
//   async function initialiseBundlr() {
//     await window.ethereum.enable();

//     const provider = new providers.Web3Provider(window.ethereum);
//     await provider._ready();

//     const bundlr = new WebBundlr(
//       "https://node2.bundlr.network",
//       currency,
//       provider
//     );
//     await bundlr.ready();

//     setBundlrInstance(bundlr);
//     bundlrRef.current = bundlr;
//     fetchBalance();
//   }

//   async function fetchBalance() {
//     const bal = await bundlrRef.current.getLoadedBalance();
//     console.log("bal: ", utils.formatEther(bal.toString()));
//     setBalance(utils.formatEther(bal.toString()));
//   }

//   async function fundWallet() {
//     if (!amount) return;
//     const amountParsed = parseInput(amount);
//     try {
//       await bundlrInstance.fund(amountParsed);
//       fetchBalance();
//     } catch (err) {
//       console.log("Error funding wallet: ", err);
//     }
//   }

//   function parseInput(input) {
//     const conv = new BigNumber(input).multipliedBy(
//       bundlrInstance.currencyConfig.base[1]
//     );
//     if (conv.isLessThan(1)) {
//       console.log("error: value too small");
//       return;
//     } else {
//       return conv;
//     }
//   }

//   function onFileChange(e) {
//     const file = e.target.files[0];
//     if (!file) return;
//     setOriginalFile(file)
//     checkUploadCost(file.size);
//     if (file) {
//       const video = URL.createObjectURL(file);
//       setLocalVideo(video);
//       let reader = new FileReader();
//       reader.onload = function (e) {
//         if (reader.result) {
//           setFile(Buffer.from(reader.result));
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   }

//   async function checkUploadCost(bytes) {
//     if (bytes) {
//       const cost = await bundlrInstance.getPrice(bytes);
//       console.log(cost)
//       setFileCost(utils.formatEther(cost));
//     }
//   }

//   async function uploadFile() {
//     if (!file) return;
//     const tags = [{ name: "Content-Type", value: "video/mp4" }];
//     try {
//       let tx = await bundlrInstance.uploader.upload(file, tags);
//       setURI(`https://arweave.net/${tx.data.id}`);
//     } catch (err) {
//       console.log("Error uploading video: ", err);
//     }
//   }

//   async function saveVideo() {
//     if (!file || !title || !description) return;
//     const tags = [
//       { name: "Content-Type", value: "text/plain" },
//       { name: "App-Name", value: APP_NAME },
//     ];

//     if (tagSelectState) {
//       tags.push({
//         value: tagSelectState.value,
//       });
//     }

//     const video = {
//       title,
//       description,
//       URI,
//       createdAt: new Date(),
//       createdBy: bundlrInstance.address,
//     };

//     try {
//       let tx = await bundlrInstance.createTransaction(JSON.stringify(video), {
//         tags,
//       });
//       await tx.sign();
//       const { data } = await tx.upload();

//       console.log(`https://arweave.net/${data.id}`);
//       setTimeout(() => {
//         navigate("/testpage");
//       }, 2000);
//     } catch (err) {
//       console.log("error uploading video with metadata: ", err);
//     }
//   }

//   const toArrayBuffer = (file) =>
//     new Promise((resolve, reject) => {
//       const fr = new FileReader();
//       fr.readAsArrayBuffer(file);
//       fr.addEventListener("loadend", (evt) => {
//         resolve(evt.target.result);
//       });
//     });

//     function showError(msg) {
//         console.log("error:", msg);
//       }


//   //Create a checkpoint

// async function doDeploy(e) {
//     console.log("currency:", currency);
//     //const topics = [{ name: "Content-Type", value: "video/mp4" }];

//     if (currency === "matic") {
//       if (!window.ethereum) {
//         showError("Metamask is required!");
//         return;
//       }
//       try {
//         await window.ethereum.enable();
//         const provider = new providers.Web3Provider(window.ethereum);
//         await provider._ready();

//         const bundlr = new WebBundlr(
//           "https://node2.bundlr.network",
//           currency,
//           provider
//         );

//         await bundlr.ready();

//         // fund account
//         const price = await bundlr.getPrice(originalFile.size);
//         const balance = await bundlr.getLoadedBalance();
//         const uploadCost = utils.formatEther(price.minus(balance).multipliedBy(1.1).toFixed(0));
//         if (balance.isLessThan(price)) {
//           await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
//         }

//         const trx = bundlr.createTransaction(file, {
//           tags: [{ name: "Content-Type", value: originalFile.type }],
//         });

//         await trx.sign();
//         console.log("Signed transaction")
//         const result = await trx.upload();
//         console.log("Uploaded")
//         const addr = "zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE";
//         console.log(
//           "DEPLOY BUNDLR PROPS",
//           title,
//           description,
//           addr,
//           originalFile.type,
//           result.data.id,
//           topics,
//           uploadCost
//         );
//         const result2 = await deployBundlr(
//           title,
//           description,
//           addr,
//           originalFile.type,
//           result.data.id,
//           topics,
//           uploadCost
//         );
//         console.log("Completed Upload, redirecting 3...");
//         // reset form
//         document.forms[0].reset();
//         console.log("Completed Upload, redirecting 2...");

//         //setTx(result2.id);
//         console.log("Completed Upload, redirecting 1...");

//         setImgCache([
//           ...imgCache,
//           { id: result2.id, src: URL.createObjectURL(originalFile) },
//         ]);
//         console.log(`https://arweave.net/${result.data.id}`);
//         console.log("Completed Upload, redirecting 0...");

//         setTimeout(() => {
//           navigate(`/AssetManagement/${result.data.id}`);
//         }, 2000);
//       } catch (e) {
//         console.log(e);
//       }
//     }}  

//   return (
//     <div>
     
//       <div className={"formStyle"}>
//         <p className={"labelStyle"}>Add Video</p>
//         <div className={"inputContainerStyle"}>
//           <input type="file" onChange={onFileChange} />
//         </div>
//         {localVideo && (
//           <video
//             key={localVideo}
//             width="320"
//             height="240"
//             controls
//             className={"videoStyle"}
//           >
//             <source src={localVideo} type="video/mp4" />
//           </video>
//         )}
//         {fileCost && (
//           <h4>Cost to upload: {Math.round(fileCost * 1000) / 1000} MATIC</h4>
//         )}
//         {/* <button className={"buttonStyle"} onClick={uploadFile}>Upload Video</button> */}

//         <div>
          
//           <div className={"formStyle"}>
//             <p className={"labelStyle"}>Tag</p>
//             <Select
//               options={tagSelectOptions}
//               className={"selectStyle"}
//               onChange={(data) => setTagSelectState(data)}
//               isClearable
//             />
//             <p className={"labelStyle"}>Title</p>
//             <input
//               className={"inputStyle"}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Video title"
//             />
//             <p className={"labelStyle"}>Description</p>
//             <textarea
//               placeholder="Video description"
//               onChange={(e) => setDescription(e.target.value)}
//               className={"textAreaStyle"}
//             />
//           </div>
//         </div>
//       </div>
//       <Button onPress={doDeploy}>DEPLOY ATOMIC VIDEO</Button>
//       {/* <IMG /> */}
//     </div>
//   );
// }

// export function IMG() {
//   const { connect, keyStores, WalletConnection } = nearAPI;
//   const [imgCache, setImgCache] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [topics, setTopics] = useState("");
//   const [currency, setCurrency] = useState("");
//   const [tx, setTx] = useState("");
//   const NEAR_OPTS = {
//     networkId: "mainnet",
//     keyStore: new keyStores.BrowserLocalStorageKeyStore(),
//     nodeUrl: "https://rpc.mainnet.near.org",
//     walletUrl: "https://wallet.mainnet.near.org",
//     helperUrl: "https://helper.mainnet.near.org",
//   };
//   const navigate = useNavigate();


//   const changeTitle = (event) => {
//     setTitle(event.target.value);
//   };

//   const changeDescription = (event) => {
//     setDescription(event.target.value);
//   };

//   const changeTopics = (event) => {
//     setTopics(event.target.value);
//   };

//   const changeTx = (event) => {
//     setTx(event.target.value);
//   };

//   const changeCurrency = (event) => {
//     setCurrency(event.target.value);
//   };

//   const changeFile = () => {
//     var fileInputEl = document.createElement("input");
//     fileInputEl.type = "file";
//     fileInputEl.accept =
//       "image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml";
//     fileInputEl.style.display = "none";
//     document.body.appendChild(fileInputEl);
//     fileInputEl.addEventListener("input", function (e) {
//       changeFile(e);
//       document.body.removeChild(fileInputEl);
//     });
//     fileInputEl.click();
//   };

//   const handleFileClick = () => {
//     var fileInputEl = document.createElement("input");
//     fileInputEl.type = "file";
//     fileInputEl.accept =
//       "image/* image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml";
//     fileInputEl.style.display = "none";
//     document.body.appendChild(fileInputEl);
//     fileInputEl.addEventListener("input", function (e) {
//       handleUpload(e);
//       document.body.removeChild(fileInputEl);
//     });
//     fileInputEl.click();
//   };

//   const handleUpload = async (evt) => {
//     console.log(evt.target.files);
//     let files = evt.target.files;
//     setFiles(evt.target.files);
//     previewImage(evt);

//     let reader = new FileReader();
//     if (files && files.length > 0) {
//       reader.onload = function () {
//         if (reader.result) {
//           //setFiles(Buffer.from(reader.result));
//         }
//       };
//       reader.readAsArrayBuffer(files[0]);
//     }
//   };

//   function showError(msg) {
//     console.log("error:", msg);
//   }

//   const toArrayBuffer = (file) =>
//     new Promise((resolve, reject) => {
//       const fr = new FileReader();
//       fr.readAsArrayBuffer(file);
//       fr.addEventListener("loadend", (evt) => {
//         resolve(evt.target.result);
//       });
//     });

//   async function doDeploy(e) {
//     e.preventDefault();
//     console.log("currency:", currency);
//     if (currency === "matic") {
//       if (!window.ethereum) {
//         showError("Metamask is required!");
//         return;
//       }
//       try {
//         await window.ethereum.enable();
//         const provider = new providers.Web3Provider(window.ethereum);
//         await provider._ready();

//         const bundlr = new WebBundlr(
//           "https://node2.bundlr.network",
//           currency,
//           provider
//         );

//         await bundlr.ready();

//         // fund account
//         const price = await bundlr.getPrice(files[0].size);
//         const balance = await bundlr.getLoadedBalance();

//         if (balance.isLessThan(price)) {
//           await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
//         }

//         const trx = bundlr.createTransaction(await toArrayBuffer(files[0]), {
//           tags: [{ name: "Content-Type", value: files[0].type }],
//         });

//         await trx.sign();

//         const result = await trx.upload();

//         const addr = "zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE";
//         console.log(
//           "DEPLOY BUNDLR PROPS",
//           title,
//           description,
//           addr,
//           files[0].type,
//           result.data.id,
//           topics
//         );
//         const result2 = await deployBundlr(
//           title,
//           description,
//           addr,
//           files[0].type,
//           result.data.id,
//           topics
//         );
//         console.log("Completed Upload, redirecting 3...");
//         // reset form
//         document.forms[0].reset();
//         console.log("Completed Upload, redirecting 2...");

//         setTx(result2.id);
//         console.log("Completed Upload, redirecting 1...");

//         setImgCache([
//           ...imgCache,
//           { id: result2.id, src: URL.createObjectURL(files[0]) },
//         ]);
//         console.log(`https://arweave.net/${result.data.id}`);
//         console.log("Completed Upload, redirecting 0...");

//         setTimeout(() => {
//           navigate("/testpage");
//         }, 2000);
//       } catch (e) {
//         console.log(e);
//       }
//       // } else if (currency === "near") {
//       //   /** wip
//       //    * need to handle redirect for success and failure
//       //    * the connect process leaves the app, so upon redirect
//       //    * we need to reconnect to arweave wallet and ingest the
//       //    * redirect information. Then restore the upload info for
//       //    * the img form.
//       //    */
//       //   deployDlg = true;
//       //   const near = await connect(NEAR_OPTS);
//       //   const provider = new WalletConnection(near, "bundlr");
//       //   await provider.requestSignIn("img", "img.arweave.dev");

//       //   const bundlr = new WebBundlr(
//       //     "https://node2.bundlr.network",
//       //     "near",
//       //     provider
//       //   );
//       //   await bundlr.ready();

//       //   // fund account
//       //   const price = await bundlr.getPrice(files[0].size);
//       //   const balance = await bundlr.getLoadedBalance();

//       //   if (balance.isLessThan(price)) {
//       //     await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
//       //   }

//       //   const trx = await bundlr.createTransaction(
//       //     await toArrayBuffer(files[0]),
//       //     {
//       //       tags: [{ name: "Content-Type", value: files[0].type }],
//       //     }
//       //   );

//       //   await trx.sign();

//       //   const result = await trx.upload();

//       //   const addr = await AMW.getActiveAddress();

//       //   const result2 = await deployBundlr(
//       //     title,
//       //     description,
//       //     addr,
//       //     files[0].type,
//       //     result.data.id,
//       //     topics
//       //   );

//       //   deployDlg = false;

//       //   // reset form
//       //   document.forms[0].reset();

//       //   setTx(result2.id);

//       //   setImgCache([
//       //     ...imgCache,
//       //     { id: result2.id, src: URL.createObjectURL(files[0]) },
//       //   ]);

//       //   confirmDlg = true;
//       // } else if (currency === "sol") {
//       //   if (!window.solana) {
//       //     showError("Phantom Wallet is required!");
//       //     return;
//       //   }
//       //   try {
//       //     deployDlg = true;
//       //     await window.solana.connect();
//       //     const provider = new PhantomWalletAdapter();
//       //     await provider.connect();

//       //     const bundlr = new WebBundlr(
//       //       "https://node2.bundlr.network",
//       //       "solana",
//       //       provider
//       //     );
//       //     await bundlr.ready();
//       //     // fund account
//       //     const price = await bundlr.getPrice(files[0].size);
//       //     const balance = await bundlr.getLoadedBalance();

//       //     if (balance.isLessThan(price)) {
//       //       await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
//       //     }

//       //     const trx = await bundlr.createTransaction(
//       //       await toArrayBuffer(files[0]),
//       //       {
//       //         tags: [{ name: "Content-Type", value: files[0].type }],
//       //       }
//       //     );

//       //     await trx.sign();

//       //     const result = await trx.upload();

//       //     const addr = await AMW.getActiveAddress();

//       //     const result2 = await deployBundlr(
//       //       title,
//       //       description,
//       //       addr,
//       //       files[0].type,
//       //       result.data.id,
//       //       topics
//       //     );

//       //     deployDlg = false;

//       //     // reset form
//       //     document.forms[0].reset();

//       //     setTx(result2.id);

//       //     setImgCache([
//       //       ...imgCache,
//       //       { id: result2.id, src: URL.createObjectURL(files[0]) },
//       //     ]);

//       //     confirmDlg = true;
//       //   } catch (e) {
//       //     //console.log(e);
//       //     deployDlg = false;
//       //     showError("Could not upload using SOL, check your SOL balance.");
//       //   }
//       // } else {
//       //   if (!window.arweaveWallet) {
//       //     errorMessage = "Arweave Wallet not found!";
//       //     errorDlg = true;
//       //     return;
//       //   }
//       //   // connnect
//       //   await AMW.connect([
//       //     "ACCESS_ADDRESS",
//       //     "SIGN_TRANSACTION",
//       //     "DISPATCH",
//       //   ]);
//       //   const addr = await AMW.getActiveAddress();

//       //   try {
//       //     deployDlg = true;
//       //     const data = await toArrayBuffer(files[0]);
//       //     const result = await deploy(
//       //       title,
//       //       description,
//       //       addr,
//       //       files[0].type,
//       //       data,
//       //       topics
//       //     );

//       //     deployDlg = false;

//       //     // reset form
//       //     e.target.reset();
//       //     // files = [];
//       //     // title = "";
//       //     // description = "";

//       //     setTx(result.id);
//       //     setImgCache([
//       //       ...imgCache,
//       //       { id: tx, src: URL.createObjectURL(files[0]) },
//       //     ]);

//       //     confirmDlg = true;
//       //   } catch (e) {
//       //     deployDlg = false;
//       //     errorMessage = e.message;
//       //     errorDlg = true;
//       //   }
//       // }
//     }
//   }
//   //   $: notValid = !(
//   //     files.length > 0 &&
//   //     ["matic", "sol", "ar", "near"].includes(currency) &&
//   //     title !== ""
//   //   );

//   const previewImage = (e) => {
//     const preview = document.getElementById("preview");
//     preview.src = URL.createObjectURL(e.target.files[0]);
//     preview.onload = () => URL.revokeObjectURL(preview.src);
//     //handleFileClick(e);
//   };

//   const ethProviders = ["MetaMask", "WalletConnect"];

//   const currencyMap = {
//     solana: {
//       providers: ["Phantom"],
//       opts: {},
//     },
//     matic: {
//       providers: ethProviders,
//       opts: {
//         chainId: 137,
//         chainName: "Polygon Mainnet",
//         rpcUrls: ["https://polygon-rpc.com"],
//       },
//     },
//     near: {
//       providers: ["wallet.near.org"],
//       opts: {
//         networkId: "mainnet",
//         keyStore: new keyStores.BrowserLocalStorageKeyStore(),
//         nodeUrl: "https://rpc.mainnet.near.org",
//         walletUrl: "https://wallet.mainnet.near.org",
//         helperUrl: "https://helper.mainnet.near.org",
//         explorerUrl: "https://explorer.mainnet.near.org",
//       },
//     },
//   };

//   return (
//     <>
//       <section>
//         <Container fluid>
//           {/* <Col justify="center" align="center" gap={1}>
//             <div className="gradient-border">
//               <h4>Atomic Assets</h4>
//               <form className="" onSubmit={doDeploy}>
//                 <Row justify="center" align="center" gap={1}>
//                   <img
//                     className="cardImage"
//                     src={image}
//                     id="preview"
//                     alt="your upload here"
//                   />
//                 </Row>
//                 <Row justify="center" align="center" gap={1}>
//                   <Col justify="center" align="center">
//                     <Button
//                       onClick={handleFileClick}
//                       aria-label="Static Actions"
//                     >
//                       Select file from Device
//                     </Button>
//                   </Col>

//                   {files[0] !== undefined && (
//                     <Col justify="center" align="center">
//                       <div className="mt-2 flex justify-end">
//                         <Button
//                           aria-label="Reset"
//                           onClick={() => setFiles([])}
//                           className="link"
//                         >
//                           clear
//                         </Button>
//                       </div>
//                     </Col>
//                   )}
//                 </Row>

//                 <Spacer y={2} />

//                 <Row
//                   className="form-control"
//                   justify="center"
//                   align="center"
//                   gap={1}
//                 >
//                   <Input
//                     id="title"
//                     className="input input-bordered"
//                     labelPlaceholder="Make a Title"
//                     status="secondary"
//                     aria-label="Title"
//                     onChange={changeTitle}
//                     required
//                   />
//                 </Row>
//                 <Spacer y={2} />
//                 <Row
//                   className="form-control"
//                   justify="center"
//                   align="center"
//                   gap={1}
//                 >
//                   <Textarea
//                     id="Description"
//                     aria-label="description"
//                     className="textarea textarea-bordered"
//                     labelPlaceholder="Give a description"
//                     status="secondary"
//                     onChange={changeDescription}
//                     required
//                   />
//                 </Row>
//                 <Spacer y={2} />
//                 <Row
//                   className="form-control"
//                   justify="center"
//                   align="center"
//                   gap={1}
//                 >
//                   <Input
//                     id="topics"
//                     aria-label="Data tags"
//                     className="input input-bordered"
//                     labelPlaceholder="Add a tag with a comma"
//                     status="secondary"
//                     onChange={changeTopics}
//                     required
//                   />
//                 </Row>
//                 <Spacer y={2} />
//                 <Row justify="center" align="center" gap={1}>
//                   <Col className="form-control">
//                     <Dropdown aria-label="Static Actions" required>
//                       <Dropdown.Button>
//                         {"Currency: "}
//                         {currency}
//                       </Dropdown.Button>
//                       <Dropdown.Menu
//                         onAction={(key) => setCurrency(key)}
//                         aria-label="Static Actions"
//                       >
//                         {Object.keys(currencyMap).map((v) => {
//                           return <Dropdown.Item key={v}>{v}</Dropdown.Item>; // proper/title case
//                         })}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </Col>
//                   <Col>
//                     <Button type="submit">Deploy</Button>
//                   </Col>
//                 </Row>
//               </form>
//             </div>
//           </Col> */}
//         </Container>
//       </section>

//       {/* <DeployDialog open={deployDlg} />
//         <ErrorDialog
//             open={errorDlg}
//            msg={errorMessage}
//            on:cancel={() => (errorDlg = false)}
//           />
//         <ConfirmDialog {tx} open={confirmDlg} on:cancel={() => (confirmDlg = false)} /> */}
//     </>
//   );
// }
