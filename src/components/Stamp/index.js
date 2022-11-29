import React, { useState, useEffect } from "react";
import StampButton from "../StampButton";

//Stamp returns count and a button to stamp
export default function Stamp(props) {
  const [stampCount, setStampCount] = useState();
  
  useEffect(() => {
    getStampCount(props.txId)   
  })
  
  const CACHE =
    "https://cache.permapages.app/FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA";
  
  const getStampCount = async (txId) => {
    const state = await getState();
    let stamps = Object.values(state.stamps).filter((s) => s.asset === txId);
    setStampCount(stamps.length);
    return stamps.length;
  };

  async function getState() {
    return await fetch(CACHE)
      .then((res) => res.json())
  }

  return (
    <div>
      <p className="cardTitle">Stamps Collected {stampCount}</p>
      <StampButton txId={props.txId}/>
    </div>
  );
}