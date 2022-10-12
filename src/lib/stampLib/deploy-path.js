// import { compose, toLower, join, split, map, trim } from 'ramda'
// import Arweave from 'arweave';
// import { AMW } from "../../utils/api";

// const arweave = Arweave.init({
//   host: 'arweave.net',
//   port: 443,
//   protocol: 'https'
// })

// //change this to "personal asset"
// const BAR = 'mMffEC07TyoAFAI_O6q_nskj2bT8n4UFvckQ3yELeic'
// /*
//  * Need to upload to arweave using post
//  * Then create a path manifest to upload to
//  * both sequencer and bundlr
//  */
// const SRC = 'BzNLxND_nJEMfcLWShyhU4i9BnzEWaATo6FYFsfsO0Q'


// export async function deploy(name, description, addr, contentType, data, topics = "") {
//   return Promise.resolve({ name, description, addr, contentType, data, topics })
//     // upload to arweave
//     .then(upload)
//     // dispatch to bundlr
//     .then(dispatch)
//     // post to warp
//     .then(post)
// }

// export async function deployBundlr(name, description, addr, contentType, assetId, topics = "") {
//   return Promise.resolve({ name, description, addr, contentType, assetId, topics })
//     .then(dispatch)
//     .then(post)
// }

// async function post(ctx) {
//   const tx = await createAndTag(ctx)
//   tx.id = ctx.atomicId
//   await arweave.transactions.sign(tx)
//   arweave.transactions.dispatch(tx)
//   return { id: ctx.atomicId }
// }

// async function dispatch(ctx) {
//   const tx = await createAndTag(ctx)
  
//   //const result = await AMW.uploader(tx)
//   const result = await window.arweaveWallet.dispatch(tx)

//   return { ...ctx, atomicId: result.data.id }
// }

// async function createAndTag(ctx) {
//   const tx = await arweave.createTransaction({
//     data: JSON.stringify({
//       manifest: "arweave/paths",
//       version: "0.1.0",
//       index: {
//         path: "asset"
//       },
//       paths: {
//         asset: {
//           id: ctx.assetId
//         }
//       }
//     })
//   })
//   tx.addTag('App-Name', 'SmartWeaveContract')
//   tx.addTag('App-Version', '0.3.0')
//   tx.addTag('Content-Type', "application/x.arweave-manifest+json")
//   tx.addTag('Contract-Src', SRC)
//   tx.addTag('Init-State', JSON.stringify({
//     ticker: "ATOMIC-ASSET-" + ctx.assetId,
//     balances: {
//       [ctx.addr]: 10000
//     },
//     claimable: [],
//     claims: [],
//     contentType: ctx.contentType,
//     emergencyHaltWallet: ctx.addr,
//     pairs: [],
//     invocations: [],
//     foreignCalls: [],
//     settings: [["isTradeable", true]]
//   }))
//   tx.addTag('Title', ctx.name)
//   tx.addTag('Description', ctx.description)
//   //create dynamic tags
//   tx.addTag('Type', 'image')
//   //user added tags
//   map(trim, split(',', ctx.topics)).forEach(t => {
//     tx.addTag('Topic:' + t, t)
//   })
//   console.log(tx)
//   return tx
// }
// //if arweave wallet?
// async function upload(ctx) {
//   const tx = await arweave.createTransaction({ data: ctx.data })
//   tx.addTag('Content-Type', ctx.contentType)
//   // earn bar while you upload
//   tx.addTag('Protocol-Name', 'BAR')
//   tx.addTag('Action', 'Burn')
//   tx.addTag('App-Name', 'SmartWeaveAction')
//   tx.addTag('App-Version', '0.3.0')
//   tx.addTag('Input', JSON.stringify({ function: 'mint' }))
//   tx.addTag('Contract', BAR)

//   await arweave.transactions.sign(tx)
//   const result = await arweave.transactions.post(tx)

//   if (result.status === 400) {
//     throw new Error('Not enough $AR in wallet to upload img!')
//   } else if (result.status === 200) {
//     return { ...ctx, assetId: tx.id }
//   }
//   throw new Error(result.message + ' while trying to upload!')

// }
