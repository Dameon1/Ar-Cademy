import {
    path,
    reduce,
    values,
  } from "ramda";
  import { WarpFactory } from "warp-contracts/web";
  import Account from "arweave-account";
  
  const account = new Account({
    cacheIsActivated: true,
    cacheSize: 100,
    cacheTime: 60,
  });
  const warp = WarpFactory.forMainnet();

export async function assetContractDetails(id, addr="") {
    const state = await warp
      .contract(id)
      .setEvaluationOptions({ internalWrites: true, allowBigInt: true })
      .readState()
      .then(path(["cachedValue", "state"]));
    try {
      const balances = state.balances;
      const totalBalance = reduce((a, b) => a + b, 0, values(balances));
      const addrBalance = balances[addr];
      const percentOwned = Math.floor((addrBalance / totalBalance) * 100);
      const a = await account.get(state.emergencyHaltWallet);
      return {
        state,
        percent: percentOwned,
        handle: "@" + a.profile.handle,
      };
    } catch (e) {
      console.log(e);
    }
  }