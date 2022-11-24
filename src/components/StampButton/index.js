import { Button, Row } from "@nextui-org/react";
import { WarpFactory } from "warp-contracts";

export default function StampButton(props) {
  const warp = WarpFactory.forMainnet();
  const STAMPCOIN = "FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA";
  const stamp = async (txId) => {
    return warp.contract(STAMPCOIN).connect("use_wallet").writeInteraction({
      function: "stamp",
      transactionId: txId,
      timestamp: Date.now(),
    });
  };

  return (
    <Row wrap="wrap" align="center" justify="space-around">
      {" "}
      <Button className="identity-link buttonText" onClick={() => stamp(props.txId)}>STAMP</Button>{" "}
    </Row>
  );
}
