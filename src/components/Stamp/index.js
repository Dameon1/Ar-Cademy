import React, { useState, useEffect } from "react";
import { WarpFactory } from "warp-contracts";

export default function Stamp(props) {
  const [stampCount, setStampCount] = useState();
  
  useEffect(() => {
    getStampCount(props.txId)   
  })
  
  const stamp = async (txId) => {
    return warp.contract(STAMPCOIN).connect("use_wallet").writeInteraction({
      function: "stamp",
      transactionId: txId,
      timestamp: Date.now(),
    });
  };

  const STAMPCOIN = "FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA";
  const CACHE =
    "https://cache.permapages.app/FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA";
  const warp = WarpFactory.forMainnet();
  
  const getStampCount = async (txId) => {
    const state = await getState();
    let stamps = Object.values(state.stamps).filter((s) => s.asset === txId);
    setStampCount(stamps.length);
    return stamps.length;
  };

  async function getState() {
    //let STAMPCOIN = "FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA";

    return await fetch(CACHE)
      .then((res) => res.json())
      
  }

  return (
    <div>
      <h3 className="cardTitle">Stamps Collected {stampCount}</h3>
      <button onClick={() => stamp(props.txId)}>Stamp</button>
    </div>
  );
}