import * as Market from "./market.js";

import * as Stamper from "./stamper.js";
import * as Flex from "./flex.js";

import { pathOr, pluck } from "ramda";
import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});
const { WarpFactory, LoggerFactory } = window.warp;
LoggerFactory.INST.logLevel("error");

const CACHE = "https://cache.permapages.app";

const BAR = "VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA";
const STAMPCOIN = "61vg8n54MGSC9ZHfSVAtQp4WjNb20TaThu6bkQ86pPI";
const $CODE = "XFZxNNpgb043Doa7-4sra5dnbBB5RkOHRyQJ_YOzLAg";
const warp = WarpFactory.forMainnet();

export const myBar = (addr) =>
  fetch(`${CACHE}/${BAR}`)
    .then((res) => res.json())
    .then(pathOr(0, ["balances", addr]));
export const myRewards = (addr) =>
  Market.getBalance(STAMPCOIN, addr)
    .runWith({ warp, wallet: "use_wallet" })
    .toPromise();
export const myCode = (addr) =>
  Market.getBalance($CODE, addr)
    .runWith({ warp, wallet: "use_wallet" })
    .toPromise();

export const isVouched = (addr) =>
  Stamper.isVouched(addr).runWith({ arweave }).toPromise();

export const readState = (contract) =>
  fetch(`${CACHE}/${contract}`)
    .then((res) => (res.ok ? res.json() : Promise.reject("no contract found")))
    .catch((_) => Flex.readState(contract).runWith({ warp }).toPromise());

export const readBar = () =>
  fetch(`${CACHE}/${BAR}`)
    .then((res) => (res.ok ? res.json() : Promise.reject("no contract found")))
    .catch((_) => Flex.readState(BAR).runWith({ warp }).toPromise());

// export const addPair = (contract, pair) =>
//   warp.contract(contract).connect('use_wallet').setEvaluationOptions({
//     internalWrites: true
//   }).writeInteraction({
//     function: 'addPair',
//     pair: BAR
//   })

// export const createOrder = (data) => Flex.createOrder(data).runWith({ warp }).toPromise()
// export const allowOrder = (contract, target, qty) => Flex.allow(contract, target, qty).runWith({ warp }).toPromise()

//export const sellAsset = (contract, qty, price) => Flex.sell({ contract, BAR, qty, price }).runWith({ warp }).toPromise()
// export const sellAsset = (contract, qty, price) =>
//   Promise.resolve(warp.contract(contract).connect('use_wallet').setEvaluationOptions({
//     internalWrites: true
//   }))
//     .then(c => c.writeInteraction({
//       function: 'addPair',
//       pair: BAR
//     }).then(_ => c)
//     )
//     .then(c => c.writeInteraction({
//       function: 'createOrder',
//       pair: [contract, BAR],
//       qty,
//       price
//     }).then(_ => c))
//     .then(c => c.readState().then(({ cachedValue }) => cachedValue.state))

//Flex.sell2({ contract, BAR, qty, price }).runWith({ arweave }).toPromise()
//export const buyAsset = (contract, qty) => {

//   const assetContract = warp.contract(contract).connect('use_wallet').setEvaluationOptions({
//     internalWrites: true,
//     allowBigInt: true,
//     allowUnsafeClient: true
//   })
//   const barContract = warp.contract(BAR).connect('use_wallet').setEvaluationOptions({
//     internalWrites: true,
//     allowBigInt: true,
//     allowUnsafeClient: true
//   })

//   return Promise.resolve({ qty, contract })
//     .then(({ qty, contract }) => barContract.writeInteraction({
//       function: 'allow',
//       target: contract,
//       qty: Number(qty)
//     }).then(r => ({ qty, contract, transaction: r.originalTxId })))
//     .then(({ qty, contract, transaction }) => assetContract.writeInteraction({
//       function: 'createOrder',
//       pair: [BAR, contract],
//       qty: Number(qty),
//       transaction
//     }).then(_ => transaction))
//     .then(transaction => barContract.readState().then(({ cachedValue }) => cachedValue.state)
//       .then(({ claims }) => claims.includes(transaction))
//     )
// }

//Flex.buy2({ contract, BAR, qty }).runWith({ arweave }).toPromise()

// export const mintBar = (ar) => Bar.mint(arweave, BAR, ar)
// export const arBalance = (addr) => Bar.arbalance(arweave, addr)
