// import Arweave from "arweave";
// import { SmartWeaveNodeFactory } from "redstone-smartweave";

// async function ArweaveProvider() {
//   const arweave = await Arweave.init({
//     host: "arweave.net",
//     port: 443,
//     protocol: "https",
//     timeout: 100000,
//     logging: false,
//   });

//   const providersRegistryContractTxId =
//     "urbw9dve61V1h-hRf_nEHJBVLa3Vv8J08vhY2GnvLlY";

//   const smartweave = SmartWeaveNodeFactory.memCachedBased(arweave).build();

//   // 'connecting' to a given contract, using its txId
//   const { state, validity } = await smartweave
//     .contract(providersRegistryContractTxId)
//     .readState();

//   console.log("Result", {
//     state,
//     validity,
//   },

//   );
//   return { state, validity };
// }

// debuggingClientExample().catch((e) => {
//   console.error(e);
// });


// // export function ArweaveProvider () {
// //     //const creators = Object.keys(Creators);

// //     return (
// //       <button onClick={() => console.log(debuggingClientExample())}>Something</button>
// //     );
// // }

// export default ArweaveProvider;