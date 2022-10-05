import React, { useState, useEffect } from "react";
import { WarpFactory } from "warp-contracts";

export default function Stamp(props) {
  const [stampCount, setStampCount] = useState();
  
  useEffect(() => {
    getStampCount(props.txId)   
  
    return () => {
      console.log('mounted')
    }
  })
  
  const stamp = async (txId) => {
    return warp.contract(STAMPCOIN).connect("use_wallet").writeInteraction({
      function: "stamp",
      transactionId: txId,
      timestamp: Date.now(),
    });
  };

  const STAMPCOIN = "aSMILD7cEJr93i7TAVzzMjtci_sGkXcWnqpDkG6UGcA";
  const CACHE =
    "https://cache.permapages.app/aSMILD7cEJr93i7TAVzzMjtci_sGkXcWnqpDkG6UGcA";
  const warp = WarpFactory.forMainnet();
  const getStampCount = async (txId) => {
    const state = await getState();
    let stamps = Object.values(state.stamps).filter((s) => s.asset === txId);
    console.log(stamps.length);
    setStampCount(stamps.length);
    return stamps.length;
  };

  async function getState() {
    let STAMPCOIN = "aSMILD7cEJr93i7TAVzzMjtci_sGkXcWnqpDkG6UGcA";

    return await fetch(CACHE)
      .then((res) => res.json())
      .catch((_) =>
        warp
          .contract(STAMPCOIN)
          .setEvaluationOptions({
            allowUnsafeClient: true,
          })
          .readState()
          .then((result) => result.state)
      );
  }

  return (
    <div>
      <p>Stamps Collected {stampCount}</p>
      <button onClick={() => console.log(stampCount)}>Click Me</button>
    </div>
  );
}
