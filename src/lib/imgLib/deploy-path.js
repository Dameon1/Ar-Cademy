import {  split, map, trim } from "ramda";
import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

//const BAR = "VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA";
const SRC = "BzNLxND_nJEMfcLWShyhU4i9BnzEWaATo6FYFsfsO0Q";
const URL = "https://d1o5nlqr4okus2.cloudfront.net/gateway/contracts/deploy";

export async function deployBundlr(
  title,
  description,
  addr,
  contentType,
  assetId,
  topics = "",
  uploadCost,
  currency,
  externalLinks,
  videoImageid
) {
  return Promise.resolve({
    title,
    description,
    addr,
    contentType,
    assetId,
    topics,
    uploadCost,
    currency,
    externalLinks,
    videoImageid,
  })
    .then(dispatch)
    .then(post);
}

async function post(ctx) {
  console.log("step 10: Creating Warp transaction");
  const tx = await createAndTag(ctx);
  console.log("step 11: Sign Contract creation of asset");
  await arweave.transactions.sign(tx);
  tx.id = ctx.atomicId;
  console.log("step 12: Post to Warp");
  const result = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ contractTx: tx }),
    headers: {
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  console.log(result);
  return { id: ctx.atomicId };
}

async function dispatch(ctx) {
  console.log("step 6: Create Manifest");
  const tx = await createAndTag(ctx);
  console.log("step 9: Dispatch Manifest");
  const result = await window.arweaveWallet.dispatch(tx);
  return { ...ctx, atomicId: result.id };
}

async function createAndTag(ctx) {
  console.log("step 7: Manifest creation stage 2");
  const tx = await arweave.createTransaction({
    data: JSON.stringify({
      manifest: "arweave/paths",
      version: "0.1.0",
      index: {
        path: "asset",
      },
      paths: {
        asset: {
          id: ctx.assetId,
        },
      },
    }),
  });
  tx.addTag("App-Name", "SmartWeaveContract");
  tx.addTag("App-Version", "0.3.0");
  tx.addTag("Content-Type", "application/x.arweave-manifest+json");
  tx.addTag("Contract-Src", SRC);
  tx.addTag(
    "Init-State",
    JSON.stringify({
      ticker: "ATOMIC-ASSET-" + ctx.assetId,
      balances: {
        [ctx.addr]: 10000,
      },
      claimable: [],
      claims: [],
      contentType: ctx.contentType,
      emergencyHaltWallet: ctx.addr,
      pairs: [],
      uploadCost: ctx.uploadCost,
      currencyUsed: ctx.currency,
      invocations: [],
      foreignCalls: [],
      settings: [["isTradeable", true]],
    })
  );
  tx.addTag("Title", ctx.title);
  tx.addTag("Description", ctx.description);
  let assetType = ctx.contentType.split("/")[0] || "image";
  if (assetType === "application") {
    assetType = ctx.contentType.split("/")[1];
  }
  tx.addTag("Video-Id", ctx.assetId);
  tx.addTag("Type", assetType);
  tx.addTag("Platform-Uploader", "Arcademy-Test3");
  tx.addTag("Social-Id", ctx.addr);
  tx.addTag("Video-Image-Id", ctx.videoImageid);
  tx.addTag("Education", "true");
  tx.addTag("Month", "February");
  tx.addTag("Tier", "Free");
  tx.addTag("Collection", "false");
  tx.addTag(
    "External-Links",
    JSON.stringify({
      links: ctx.externalLinks,
    })
  );

  map(trim, split(",", ctx.topics)).forEach((t) => {
    tx.addTag("Topic:", t);
  });
  console.log("step 8: Manifest creation complete:", tx);
  return tx;
}

//ARWEAVE NATIVE UPLOAD

// export async function deploy(
//   name,
//   description,
//   addr,
//   contentType,
//   data,
//   topics = ""
// ) {
//   return (
//     Promise.resolve({ name, description, addr, contentType, data, topics })
//       // upload to arweave
//       .then(upload)
//       // dispatch to bundlr
//       .then(dispatch)
//       // post to warp
//       .then(post)
//   );
// }

// async function upload(ctx) {
//   const tx = await arweave.createTransaction({ data: ctx.data });
//   tx.addTag("Content-Type", ctx.contentType);
//   // earn bar while you upload
//   tx.addTag("Protocol-Name", "BAR");
//   tx.addTag("Action", "Burn");
//   tx.addTag("App-Name", "SmartWeaveAction");
//   tx.addTag("App-Version", "0.3.0");
//   tx.addTag("Input", JSON.stringify({ function: "mint" }));
//   tx.addTag("Contract", BAR);

//   await arweave.transactions.sign(tx);
//   const result = await arweave.transactions.post(tx);

//   if (result.status === 400) {
//     throw new Error("Not enough $AR in wallet to upload img!");
//   } else if (result.status === 200) {
//     return { ...ctx, assetId: tx.id };
//   }
//   throw new Error(result.message + " while trying to upload!");
// }
