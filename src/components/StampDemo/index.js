  import {useState} from 'react';
  import { providers } from "ethers";
  import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
  import * as nearAPI from "near-api-js";

  import { deploy, deployBundlr } from "../../lib/stampLib/deploy-path.js";
//   import DeployDialog from "../dialogs/deploy.svelte";
//   import ErrorDialog from "../dialogs/error.svelte";
//   import ConfirmDialog from "../dialogs/confirm.svelte";

  import { WebBundlr } from "@bundlr-network/client";
  //const WebBundlr = Bundlr.default;
  import { AMW } from "../../utils/api";


  
export default function StampDemo() {
  const { connect, keyStores, WalletConnection } = nearAPI;
  const [imgCache,setImgCache] = useState([])
  const [files, setFiles] = useState([])
  const [profile,setProfile] = useState(null)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topics, setTopics] = useState('');
  const [currency, setCurrency] = useState('');
  const [tx, setTx] = useState('');
  const NEAR_OPTS = {
    networkId: "mainnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
  };

  //let files = [];
//   let title = "";
//   let description = "";
//   let topics = "";
  let deployDlg = false;
  let errorMessage = "";
  let errorDlg = false;
  let confirmDlg = false;

  const c = (event) => {
    console.log(event.target.value)
    setFiles(event.target.value)
  }

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const changeTopics = (event) => {
    setTopics(event.target.value);
  };

  const changeTx = (event) => {
    setTx(event.target.value);
  };

  const changeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const changeFile = () => {
    var fileInputEl = document.createElement("input");
    fileInputEl.type = "file";
    fileInputEl.accept="image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml"
    fileInputEl.style.display = "none";
    document.body.appendChild(fileInputEl);
    fileInputEl.addEventListener("input", function (e) {
    changeFile(e);
      document.body.removeChild(fileInputEl);
    });
    fileInputEl.click();
  };

  const handleFileClick = () => {
    var fileInputEl = document.createElement("input");
    fileInputEl.type = "file";
    fileInputEl.accept = "image/*";
    fileInputEl.style.display = "none";
    document.body.appendChild(fileInputEl);
    fileInputEl.addEventListener("input", function (e) {
      handleUpload(e);
      document.body.removeChild(fileInputEl);
    });
    fileInputEl.click();
  };

  const handleUpload = async (evt) => {
    console.log(evt.target.files)
    let files = evt.target.files;
    setFiles(evt.target.files)
    previewImage(evt)

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
    errorMessage = msg;
    errorDlg = true;
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
    console.log("currency:", currency)
    if (currency === "matic") {
      if (!window.ethereum) {
        showError("Metamask is required!");
        return;
      }
       try {
         deployDlg = true;
        
         await window.ethereum.enable();
         const provider = new providers.Web3Provider(window.ethereum);
         await provider._ready();

         const bundlr = new WebBundlr(
           "https://node2.bundlr.network",
           "matic",
           provider
         );

         await bundlr.ready();
            console.log("file:",files)
    // fund account
         const price = await bundlr.getPrice(files[0].size);
         const balance = await bundlr.getLoadedBalance();

         if (balance.isLessThan(price)) {
           await bundlr.fund(price.minus(balance).multipliedBy(1.1).toFixed(0));
         }

        const trx = await bundlr.createTransaction(
          await toArrayBuffer(files[0]),
          {
            tags: [{ name: "Content-Type", value: files[0].type }],
          }
        );

        await trx.sign();

        const result = await trx.upload();

        const addr = await bundlr.address;

        const result2 = await deployBundlr(
          title,
          description,
          addr,
          files[0].type,
          result.data.id,
          topics
        );

        deployDlg = false;

        // reset form
        document.forms[0].reset();

        setTx(result2.id);

        setImgCache([
          ...imgCache,
          { id: result2.id, src: URL.createObjectURL(files[0]) },
        ]);

        confirmDlg = true;
      } catch (e) {
        console.log(e);
        deployDlg = false;
        errorMessage = e.message;
        errorDlg = true;
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


const previewImage = e => {
    const preview = document.getElementById('preview');
    preview.src = URL.createObjectURL(e.target.files[0]);
    preview.onload = () => URL.revokeObjectURL(preview.src);
    //handleFileClick(e);
 };
    
  return (
    <>
            <main>
              <section className="hero min-h-screen bg-base-100 items-start">
                <div className="flex flex-col items-center justify-start">
                  <p>Upload</p>
                  <form className="form mt-16 px-4 md:px-0" onSubmit={doDeploy}>
                    <div className="flex flex-col md:flex-row md:space-x-16 justify-center">
                      <div>
                        {files[0] !== undefined && (
                            <>
                            {/* <img
                            className="border-2 border-secondary w-full md:w-[500px]"
                            src={URL.createObjectURL(files[0])}
                            alt="img"
                          /> */}
                          <div className="mt-2 flex justify-end">
                            <button onClick={() => (setFiles([]))} className="link">clear</button
                            >
                          </div>
                            </>
                        )}
                        <img className="cardImage" id="preview" alt="your upload here"/>
                        
                        <div className="form-control">
                            <label
                              htmlFor="file"
                              className="bg-gray-200 h-[200px] md:h-[350px] w-full md:w-[500px] grid place-items-center rounded-xl hover:shadow-xl"
                            >
                              <div>
                                <span className="text-gray-400">Select Image</span>
                                <img src="public/favicon.ico" alt="icon" />
                              </div>
                            </label>
                            
                            <input
                              id="file"
                              type="file"
                              className="hidden input input-bordered"
                              onChange={previewImage}
                            //   bind:files
                              accept="image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml"
                            />
                            </div>
                            <button onClick={handleFileClick}>Select file from Device</button>
                        {files.length === 0 && (
                            
                            <div className="form-control">
                            <label
                              htmlFor="file"
                              className="bg-gray-200 h-[200px] md:h-[350px] w-full md:w-[500px] grid place-items-center rounded-xl hover:shadow-xl"
                            >
                              <div>
                                <span className="text-gray-400">Select Image</span>
                                <img src="public/favicon.ico" alt="icon" />
                              </div>
                            </label>
                            <input
                              id="file"
                              type="file"
                              className="hidden input input-bordered"
                              onChange={previewImage}
                            //   bind:files
                              accept="image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml"
                            />
                            <p
                              className="py-8 w-full md:w-[500px] bg-whitesmoke-200 text-gray-500 text-sm"
                            >
                              When uploading images, it is important to note that you are
                              storing these images on a permanent blockchain and by
                              uploading you are indicating that you have permission to do
                              so. NSFW content is not permitted on this service.
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="form-control">
                          <label htmlFor="title" className="label" required>Title *</label>
                          <input
                            id="title"
                            className="input input-bordered"
                            onChange={changeTitle}
                            //bind:value={title}
                            //required
                          />
                          
                        </div>
                        <div className="form-control">
                          <label htmlFor="desc" className="label">Description</label>
                          <textarea
                            id="desc"
                            className="textarea textarea-bordered"
                            onChange={changeDescription}
                            //bind:value={description}
                          />
                        </div>
                        <div className="form-control">
                          <label htmlFor="topics" className="label">Topics</label>
                          <input
                            id="topics"
                            className="input input-bordered"
                            onChange={changeTopics}
                            //bind:value={topics}
                          />
                          <label className="label text-sm text-gray-400"
                            >Enter a comma-separated list topics (e.g. collection, category,
                            etc)</label
                          >
                        </div>
                        <div className="form-control">
                          <label htmlFor="currency" className="label">Currency *</label>
                          <select className="select select-bordered" onChange={changeCurrency}>
                          {/* //</div> bind:value={currency}> */}
                            <option value="none">Choose</option>
                            <option value="sol">$SOL</option>
                            <option value="matic">$MATIC</option>
                            <option value="ar">$AR</option>
                            {/* <--
                            <option value="near">$near</option>
                            --> */}
                          </select>
                          <label className="label text-sm text-gray-400"
                            >(when using $AR you also mint $BAR)</label
                          >
                        </div>
                        {/* <div className="my-16 space-y-4">
                          <button disabled={notValid} className="btn btn-block">Deploy</button>
                        </div> */}
                        <button type="submit">Deploy</button>
                      </div>
                    </div>
                    </form>
                    </div>
              </section>
            </main>
                  
        {/* <DeployDialog open={deployDlg} />
        <ErrorDialog
            open={errorDlg}
           msg={errorMessage}
           on:cancel={() => (errorDlg = false)}
          />
        <ConfirmDialog {tx} open={confirmDlg} on:cancel={() => (confirmDlg = false)} /> */}
        </>
)}