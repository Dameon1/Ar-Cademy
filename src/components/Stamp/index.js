import React, { useState, useEffect, useContext } from "react";
import { Tooltip } from "@nextui-org/react";
import { WarpFactory } from "warp-contracts";
import StampButton from "../StampButton";
import { BsHeart, BsHeartHalf, BsHeartFill } from "react-icons/bs";
import { isVouched } from "../../lib/imgLib/stamp";
import MainContext from "../../context";

//Stamp returns count and a button to stamp
export default function Stamp(props) {
  const { txId } = props;
  const { addr } = useContext(MainContext);
  const [vouched, setVouched] = useState(false);
  const [isStamped, setIsStamped] = useState(false);
  const [stampCount, setStampCount] = useState(0);

  const warp = WarpFactory.forMainnet();
  const STAMPCOIN = "61vg8n54MGSC9ZHfSVAtQp4WjNb20TaThu6bkQ86pPI";

  useEffect(() => {
    async function getData() {
      const userVouched = await isVouched(addr);
      setVouched(userVouched);
      await getStampCount(txId);
    }
    getData();
  }, [addr, stampCount, txId]);

  const CACHE =
    "https://cache.permapages.app/FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA";

  const handleStamp = async (txId) => {
   await warp.contract(STAMPCOIN).connect("use_wallet").writeInteraction({
     function: "stamp",
     transactionId: txId,
     timestamp: Date.now(),
   });
   await getStampCount(txId);
 };

  const getStampCount = async (txId) => {
    const state = await getState();
    let stamps = Object.values(state.stamps).filter((s) => s.asset === txId);
    let stampers = stamps.map((asset) => {
      return Object.values(asset)[2];
    });
    setIsStamped(stampers.filter((stamper) => stamper === addr)[0] === addr);
    setStampCount(stamps.length);
  };

  async function getState() {
    return await fetch(CACHE).then((res) => res.json());
  }

  return (
    <div>
      <Tooltip
        content={
          isStamped
            ? null
            : vouched
            ? "Stamp 💓"
            : addr
            ? "Get vouched to 💓"
            : "Sign in to stamp"
        }
        hideArrow
        placement="bottom"
        offset={2}
      >
        <StampButton
          txId={props.txId}
          icon={
            isStamped ? (
              <BsHeartFill  />
            ) : vouched ? (
              <BsHeartHalf />
            ) : (
              <BsHeart />
            )
          }
          getStampCount={getStampCount}
          handleStamp={handleStamp}
          count={stampCount}
          disabled={isStamped || !vouched ? true : false}
        />
      </Tooltip>
    </div>
  );
}
