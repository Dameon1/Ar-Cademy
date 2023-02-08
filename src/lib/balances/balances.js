import * as Market from './market.js'
import { pathOr } from 'ramda'
import { LoggerFactory, WarpFactory } from 'warp-contracts';

LoggerFactory.INST.logLevel("error");

const CACHE = 'https://cache.permapages.app'
const BAR = "VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA";
const STAMPCOIN = "61vg8n54MGSC9ZHfSVAtQp4WjNb20TaThu6bkQ86pPI";
const $CODE = "XFZxNNpgb043Doa7-4sra5dnbBB5RkOHRyQJ_YOzLAg"
const warp = WarpFactory.forMainnet();

export const myBar = (addr) => fetch(`${CACHE}/${BAR}`).then(res => res.json()).then(pathOr(0, ['balances', addr]))
export const myRewards = (addr) => Market.getBalance(STAMPCOIN, addr).runWith({ warp, wallet: 'use_wallet' }).toPromise()
export const myCode = (addr) => Market.getBalance($CODE, addr).runWith({ warp, wallet: 'use_wallet' }).toPromise()