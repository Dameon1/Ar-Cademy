import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";

/**
 * This example shows the process of creating a debugging SmartWeave client.
 * It uses memCached client as a base and overwrite StateEvaluator
 */
async function debuggingClientExample() {
  const arweave = await Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 100000,
    logging: false,
  });

  const providersRegistryContractTxId =
    "urbw9dve61V1h-hRf_nEHJBVLa3Vv8J08vhY2GnvLlY";

  const newSource = `function handle(state, action) {
   console.log("\\n ===== Hello World from the new source:", SmartWeave.transaction.id);
   return {state}
  }`;
  const smartweave = SmartWeaveNodeFactory.memCachedBased(arweave)
    .overwriteSource({
      [providersRegistryContractTxId]: newSource,
    });

  // 'connecting' to a given contract, using its txId
  const { state, validity } = await smartweave
    .contract(providersRegistryContractTxId)
    .readState();

  console.log("Result", {
    state,
    validity,
  });
}

debuggingClientExample().catch((e) => {
  console.error(e);
});


export function ArweaveProvider () {
    //const creators = Object.keys(Creators);
  
    return (
      <button onClick={() => console.log(debuggingClientExample())}>Something</button>
    );
}

export default ArweaveProvider;