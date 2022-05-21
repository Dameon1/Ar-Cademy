import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";

export async function contractData() {
  const arweave = await Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 100000,
    logging: false,
  });

  const providersRegistryContractTxId =
    "urbw9dve61V1h-hRf_nEHJBVLa3Vv8J08vhY2GnvLlY";

  //   const newSource = `function handle(state, action) {
  //    console.log("\\n ===== Hello World from the new source:", SmartWeave.transaction.id);
  //    return {state}
  //   }`;
  const smartweave = SmartWeaveNodeFactory.memCachedBased(arweave).build();

  // 'connecting' to a given contract, using its txId
  const { state, validity } = await smartweave
    .contract(providersRegistryContractTxId)
    .readState();

  console.log("Result", {
    state,
    validity,
  }
  )
  return { state, validity };
}

contractData().catch((e) => {
  console.error(e);
});